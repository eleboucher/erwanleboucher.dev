---
title: "towonel: A Self-Hosted Tunnel That Doesn't Read Your Traffic"
date: 2026-05-19
description: Cloudflare Tunnel decrypts everything. Towonel doesn't.
posted: true
---

If you've read my [previous article about Pangolin](https://erwanleboucher.dev/#/blog/pangolin), you know
I've been running it to expose my homelab services without depending on Cloudflare. It worked well, but
Pangolin is heavy — too much RAM for what it does, and the Node.js stack doesn't help. On a cheap VPS
that's already doing a few other things, it adds up fast.

But the resource usage wasn't the only problem. Most tunnel solutions — Cloudflare Tunnels included —
terminate TLS at the edge. That means your traffic is decrypted on someone else's server before being
forwarded to you. For a service handling personal data, that's a meaningful compromise.

I also wanted something the [home-operations](https://discord.gg/home-operations) community could
actually use together. Most people want to leave Cloudflare but don't want to manage a VPS on their own.
If one person runs a hub and a few friends share it, the monthly cost becomes almost nothing.

So I built towonel. In Rust, partly because I wanted to learn the language properly, partly because a
tunnel proxy that spends its life doing I/O and well rust is known to be good there.

---

## Your traffic stays yours

By default, towonel does TLS passthrough. The hub reads the SNI header to know where to route the
connection, then forwards the raw TLS stream to your agent. Your keys never leave your network. The hub
sees source IPs, byte counts, and SNI hostnames, nothing else. A malicious hub operator can deny
service but cannot read or forge your traffic.

If you'd rather have the hub handle TLS, you can switch to termination mode per hostname and it'll
issue Let's Encrypt certificates on demand. But passthrough is the default, and for most homelab use
cases it's the right choice.

The control plane is signed with ML-DSA-65 (FIPS 204), post-quantum signatures on all config entries.
Even if you're sharing a hub with people you don't fully trust, they can't touch your routing.

---

## One VPS, multiple people

This is the main point of the project. You run a hub on a VPS, you create invite tokens, you hand them
to friends. They run the agent with the token and point it at their local services. No VPS management,
no Docker Compose, no Traefik config on their end.

```bash
# you, on the hub
towonel invite create \
  --hub-url https://node.example.eu:8443 \
  --name alice \
  --hostnames '*.example.eu,app.alice.example.fr'

# alice, anywhere
TOWONEL_INVITE_TOKEN=tt_inv_2_... \
TOWONEL_AGENT_SERVICES='[{"hostname":"app.alice.example.eu","origin":"127.0.0.1:8080"}]' \
towonel-agent
```

Alice gets her services exposed publicly without managing any infrastructure. You split the VPS cost
across however many people are using it. Revoking an invite immediately cuts off access.

Each tenant is scoped to their own hostnames and can manage them independently without operator
intervention. The agent is completely stateless: no disk, no init, no persistent identity. One token
boots any number of replicas, which also makes it trivial to run in Kubernetes.

---

## TCP/UDP proxy

One feature that is not possible with cloudflare is TCP/UDP proxy. With Towonel you can expose your ssh, postgres port, sturn for matrix call, game server and so much more.
The agent declares the services it wants exposed; the edge picks them up automatically. The hub operator doesn't touch anything per service.

```bash
TOWONEL_AGENT_TCP_SERVICES='[
  {"name":"forgejo-ssh", "origin":"forgejo:22",           "listen_port":2222},
  {"name":"prom-write",  "origin":"victoriametrics:8428", "listen_port":9090}
]'

TOWONEL_AGENT_UDP_SERVICES='[
  {"name":"wireguard", "origin":"10.0.0.1:51820", "listen_port":51820}
]'
```

Port allocation is enforced across all tenants: claiming a port already taken by someone else is
rejected at submission time. Privileged ports are blocked by default.

---

## Status

Alpha. I'm running it in production, replacing Pangolin entirely, but the wire format and APIs may change between `0.0.x` releases.

```bash
cargo build --release -p towonel-node -p towonel-agent
# or
docker pull git.erwanleboucher.dev/eleboucher/towonel-node:latest
docker pull git.erwanleboucher.dev/eleboucher/towonel-agent:latest
```

Source is at [git.erwanleboucher.dev/eleboucher/towonel](https://git.erwanleboucher.dev/eleboucher/towonel). If you're in the home-operations community and want to leave Cloudflare Tunnels without spinning up your own VPS, come find me on Discord.
