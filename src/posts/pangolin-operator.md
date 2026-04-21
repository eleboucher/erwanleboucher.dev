---
title: "Pangolin Operator: Managing Tunnel Infrastructure the Kubernetes Way"
date: 2026-04-21
description: How I replaced manual Pangolin management with a Kubernetes operator and a few YAML files.
posted: false
---


If you've read my [previous article about Pangolin](https://erwanleboucher.dev/#/blog/pangolin), you know
I've been running Pangolin on a VPS to expose my homelab services without depending on Cloudflare. As part
of that setup, I built [newt-sidecar](https://github.com/home-operations/newt-sidecar), a sidecar that
watches HTTPRoute resources in the cluster and pushes them to Pangolin automatically via blueprints.

It worked, but it had limits. No custom public resources, no private resources, the sidecar was just reading a config json file and pushing it to Pangolin without any feedback loop. If something went wrong on the Pangolin side, the sidecar had no way of knowing.
And there was no native way to manage the full lifecycle: creating sites, handling credentials, cleaning up resources on deletion. It was also a sidecar, which meant it was coupled to the Newt deployment rather than being a first-class citizen in my infrastructure.

Meanwhile I was still running Tailscale for private VPN access to my cluster internals. It works, but it's
yet another external dependency for something I could self-host. Pangolin already has its own VPN solution
built in (OLM), so the pieces were all there.

So I built a proper Kubernetes operator.

---

## How it works

The operator talks directly to the Pangolin Integration API and manages three types of resources:

- `NewtSite` provisions a Pangolin site and manages the `newt` tunnel Deployment that connects your cluster to your VPS
- `PublicResource` exposes a service publicly over HTTP, TCP, or UDP
- `PrivateResource` registers a host or CIDR range for OLM VPN access, this is what replaced Tailscale

Everything is namespaced under `pangolin.home-operations.com/v1alpha1`, and the operator handles the full
lifecycle: create, update, drift detection, and deletion with finalizers so nothing gets orphaned.

The biggest difference from newt-sidecar is that the operator owns the reconciliation loop. If a resource
disappears on the Pangolin side, the operator detects it on the next periodic sync and re-creates it. 
newt-sidecar had no way to do this, it pushed config once and moved on.

---

## My actual setup

The HelmRelease is minimal, I just point it at the existing secret:

```yaml
apiVersion: helm.toolkit.fluxcd.io/v2
kind: HelmRelease
metadata:
  name: pangolin-operator
spec:
  chartRef:
    kind: OCIRepository
    name: pangolin-operator
  interval: 1h
  values:
    pangolin:
      existingSecret: pangolin-operator-secret
    resources:
      limits:
        memory: 128Mi
      requests:
        cpu: 10m
        memory: 64Mi
```

---

## The sites

I run two sites. `homelab` is the main one, it manages the `newt` tunnel and auto-discovers services via my Envoy gateway. `local` is a special type that exposes resources running directly on the Pangolin VPS without deploying a tunnel at all, useful for things like routing to external S3 endpoints.

```yaml
apiVersion: pangolin.home-operations.com/v1alpha1
kind: NewtSite
metadata:
  name: homelab
spec:
  name: homelab
  newt:
    tag: 1.11.0
    mtu: 1380
    acceptClients: true
  autoDiscover:
    annotationPrefix: pangolin-operator
    denyCountries: RU,CN,KP,IR,BY,IL
    gatewayName: envoy-external
    gatewayNamespace: network
    ssl: true
    enableRouteDiscovery: true
    enableServiceDiscovery: true
---
apiVersion: pangolin.home-operations.com/v1alpha1
kind: NewtSite
metadata:
  name: local
spec:
  name: local
  type: local
```

With `enableRouteDiscovery: true` and `gatewayName: envoy-external`, any `HTTPRoute` that references my gateway is automatically picked up and exposed through Pangolin. No manual `PublicResource` CR needed for each service.

---

## Replacing Tailscale with PrivateResources

This is the part I'm most happy about. Before, I used Tailscale to access my cluster's internal networks remotely. Now that's handled entirely by Pangolin OLM through four `PrivateResource` declarations:

```yaml
apiVersion: pangolin.home-operations.com/v1alpha1
kind: PrivateResource
metadata:
  name: cluster-pods
spec:
  name: Cluster Pod Network
  siteRef: homelab
  mode: cidr
  destination: 10.42.0.0/16
---
apiVersion: pangolin.home-operations.com/v1alpha1
kind: PrivateResource
metadata:
  name: cluster-services
spec:
  name: Cluster Service Network
  siteRef: homelab
  mode: cidr
  destination: 10.43.0.0/16
---
apiVersion: pangolin.home-operations.com/v1alpha1
kind: PrivateResource
metadata:
  name: cluster-nodes
spec:
  name: Cluster Node Network
  siteRef: homelab
  mode: cidr
  destination: 192.168.1.0/24
---
apiVersion: pangolin.home-operations.com/v1alpha1
kind: PrivateResource
metadata:
  name: cluster-bgp
spec:
  name: Cluster BGP Network
  siteRef: homelab
  mode: cidr
  destination: 192.168.69.0/24
```

Pod network, service network, node network, BGP network, all of it accessible through the Pangolin client without Tailscale in the picture. One less external dependency, and it's all version-controlled alongside everything else.

## Reconciliation and drift

One thing I spent time getting right in the operator is drift detection. It doesn't just create-and-forget, it periodically checks that Pangolin still matches what's declared. If a resource disappears on the Pangolin side (manual deletion, Pangolin had a bad day...), the operator detects it and re-creates it on the next reconcile. Finalizers ensure nothing gets orphaned on deletion either.

Target updates are handled carefully: new targets are created before old ones are deleted, and the new IDs are persisted to status before cleanup. If the operator crashes mid-update, the next reconcile won't create duplicates.

---

## Prerequisites

One thing to know before deploying: the Pangolin Integration API is disabled by default. You need to enable it in your Pangolin `config.yml` before the operator will work:

```yaml
flags:
  enable_integration_api: true
```

The full setup including Traefik routing config is in the [Pangolin docs](https://docs.pangolin.net/self-host/advanced/integration-api).

The source and full README are at [github.com/home-operations/pangolin-operator](https://github.com/home-operations/pangolin-operator). If you're already running Pangolin and want your tunnel infrastructure to live in Git like everything else, this is the missing piece.
