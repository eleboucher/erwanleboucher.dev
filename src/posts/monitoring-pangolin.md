





  Monitoring My VPS with node-exporter Through a Pangolin Tunnel

  I run a small homelab on a two-node Kubernetes cluster at home, but I also have a VPS at OVH that acts as the public entry point for everything. It runs Pangolin — a self-hosted tunneling platform built around WireGuard — which exposes services from my
  cluster to the internet without opening any inbound ports at home. The VPS is essentially a dumb relay: Pangolin, Gerbil (the WireGuard peer), and Traefik for TLS and routing.

  For a while, the VPS was a blind spot in my observability stack. My cluster nodes are scraped by node-exporter running as a DaemonSet, with metrics flowing into kube-prometheus-stack. But the VPS? Nothing. I had no CPU, memory, or disk visibility on the
   machine that's handling all my public traffic.

  This post covers how I added node-exporter to the VPS and pulled metrics back into my existing Prometheus stack — without opening any extra ports or adding any new secrets.

  The Constraint: No Extra Ports

  The VPS already runs Gerbil, which holds the WireGuard tunnel back to the cluster. Newt (the cluster-side WireGuard peer) connects out to Gerbil, creating a private overlay network between the two. Any service on the VPS that joins Gerbil's network
  namespace becomes reachable from the cluster over that tunnel at Gerbil's WireGuard IP (100.89.128.1).

  This is the trick I used for node-exporter.

  Sharing the Network Namespace

  In the docker-compose.yml, I added node-exporter with network_mode: service:gerbil:

  node-exporter:
    image: quay.io/prometheus/node-exporter:v1.10.2
    container_name: node-exporter
    restart: unless-stopped
    network_mode: service:gerbil
    pid: host
    command:
      - --path.procfs=/host/proc
      - --path.sysfs=/host/sys
      - --path.rootfs=/host/root
      - --web.listen-address=:9100
    volumes:
      - /proc:/host/proc:ro,rslave
      - /sys:/host/sys:ro,rslave
      - /:/host/root:ro,rslave

  network_mode: service:gerbil means node-exporter shares Gerbil's network interfaces — including its WireGuard interface. So node-exporter listening on :9100 is accessible at 100.89.128.1:9100 from anywhere on the overlay network, including the cluster.

  The pid: host and the bind-mounted /proc, /sys, / paths are standard node-exporter practice to get actual host metrics rather than container metrics.

  Scraping With Prometheus Agent Mode

  Rather than having the cluster scrape the VPS (which would require exposing node-exporter or building a custom ServiceMonitor for an external target), I flipped the direction: the VPS pushes metrics to the cluster via Prometheus in agent mode.

  Prometheus agent mode is a lightweight write-only mode — no UI, no local query engine, no retention. It scrapes targets and remote-writes immediately. Perfect for this use case.

  prometheus-agent:
    image: prom/prometheus:v3.10.0
    container_name: prometheus-agent
    restart: unless-stopped
    command:
      - --config.file=/etc/prometheus/prometheus.yml
      - --agent
      - --storage.agent.path=/prometheus
    network_mode: service:gerbil
    depends_on:
      - node-exporter

  Again, network_mode: service:gerbil — so prometheus-agent shares the same network stack. It scrapes node-exporter at localhost:9100 (they're in the same namespace), then remote-writes to https://prometheus-rw.erwanleboucher.dev.

  The scrape config sets labels to make VPS metrics clearly identifiable in Grafana:

  scrape_configs:
    - job_name: node_exporter
      static_configs:
        - targets:
            - localhost:9100
      relabel_configs:
        - target_label: job
          replacement: node-exporter
        - target_label: instance
          replacement: pangolin-vps
        - target_label: nodename
          replacement: vps

  Securing the Remote Write Endpoint

  prometheus-rw.erwanleboucher.dev is an HTTPRoute on my cluster's Envoy Gateway. It forwards /api/v1/write to the Prometheus StatefulSet's port 9090. But I didn't want this endpoint to be publicly reachable — it should only accept writes from the VPS.

  This is where newt-sidecar comes in. I'm the maintainer of this project — it's a sidecar init container that watches Kubernetes HTTPRoutes and dynamically generates Newt's blueprint configuration for Pangolin. One of its features is per-route IP
  allowlisting via an annotation.

  The HTTPRoute for remote write looks like this:

  apiVersion: gateway.networking.k8s.io/v1
  kind: HTTPRoute
  metadata:
    name: prometheus-remote-write
    annotations:
      newt-sidecar/rules: '[{"action":"allow","match":"ip","value":"172.19.0.1"},{"action":"deny","match":"cidr","value":"0.0.0.0/0"}]'
  spec:
    hostnames:
      - prometheus-rw.erwanleboucher.dev
    parentRefs:
      - name: kgateway-external
        namespace: network
        sectionName: https
    rules:
      - matches:
          - path:
              type: PathPrefix
              value: /api/v1/write
        backendRefs:
          - name: kube-prometheus-stack-prometheus
            namespace: observability
            port: 9090

 Finding the Right IP

  This is slightly non-obvious. I knew traffic was flowing through Gerbil's WireGuard interface (wg0 at 100.89.128.1), so my first instinct was to use that. But that's not the IP Envoy Gateway actually sees.

  To find the real source IP, I inspected the routing table inside the Gerbil container:

  ssh user@your-vps
  docker exec gerbil ip route show

  default via 172.19.0.1 dev eth0
  100.89.128.0/24 dev wg0  src 100.89.128.1
  172.19.0.0/16  dev eth0  src 172.19.0.5

  The default route goes via 172.19.0.1 on eth0 — the Docker bridge gateway. Pangolin itself routes outbound traffic over eth0, not wg0, so when it proxies a remote write request through the tunnel into the cluster, Envoy sees
   the source IP as 172.19.0.1, not Gerbil's WireGuard address. That's the IP to put in the allowlist.
   
  The newt-sidecar/rules annotation tells newt-sidecar to only allow traffic from 172.19.0.1 (the Pangolin WireGuard gateway IP) and deny everything else. newt-sidecar reads this annotation, translates it into Newt tunnel rules, and applies them at the
  Pangolin layer — before a request even reaches the cluster. The domain is public DNS, but requests that don't originate from the right WireGuard peer are dropped at the tunnel edge.

  The Full Picture

  VPS (Gerbil/WireGuard)
    └── node-exporter (port 9100, same netns as Gerbil)
    └── prometheus-agent (same netns, scrapes localhost:9100)
          └── remote_write → https://prometheus-rw.erwanleboucher.dev
                                  │
                      [newt-sidecar IP allowlist: 172.19.0.1 only]
                                  │
                      Envoy Gateway → Prometheus (cluster)

  The metrics flow entirely over the existing WireGuard tunnel. No new ports, no new credentials for scraping, no ServiceMonitor pointing at an external IP. The VPS pushes, the cluster accepts, and newt-sidecar makes sure nothing else gets in.

  In Grafana I can now use the same Node Exporter Full dashboard and filter by nodename="vps" to see the VPS alongside my cluster nodes.
