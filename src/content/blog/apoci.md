---
title: 'apoci: A Federated Container Registry Built on ActivityPub'
date: 2026-04-25
description: What happens when your homelab dies and you have to rebootstrap from scratch.
posted: false
---

I want everything to be independent from American corporations. So I try to host as many services as
possible, and build alternatives when I can't find good ones. It works great until you ask yourself one
uncomfortable question: if my homelab dies tomorrow, how do I bring it back up?

Most people would answer "from Docker Hub" or "from GHCR." Which means depending on third-party
infrastructure at exactly the moment you need to be most self-sufficient. That bothered me enough that
I built something about it.

**apoci** is a federated OCI container registry. Each node is a single-user registry and an ActivityPub
actor — `@registry@foo.com`. Push an artifact and it federates to your followers. When your server goes
down, your peers still serve your images and you can rebootstrap from any of them.

The replication problem for a container registry isn't that different from the social web problem: you
want content to flow between independent nodes without a central coordinator. ActivityPub already solved
that, so I used it.

Like Harbor or Zot, but federated. Like Mastodon, but for container images.

---

## How it works

When you push a manifest, three AP activities fire to every follower: the manifest itself, the tag
mapping, and a blob announcement that triggers background replication. By the time a peer confirms, they
already have everything they need to serve your image independently.

The part that required the most design work was namespacing. When you federate across independently-
operated nodes, two people can have an image called `myapp` and they can't collide. The solution is the
same one the fediverse uses for accounts: domain-prefix everything.

```bash
docker pull foo.com/foo.com/myapp:v1      # your own image, from your node
docker pull foo.com/bar.com/myapp:v1      # bar's image, served from your node
docker pull bar.com/bar.com/myapp:v1      # bar's image, directly from bar
```

The second case is the interesting one. If `foo` follows `bar`, `foo` has `bar`'s metadata. On pull,
`foo` fetches the blob from `bar`, verifies the SHA-256, caches it, and serves it locally. Next pull is
fully local. The domain prefix is added automatically on push so you don't have to type it every time,
and writes to a foreign namespace are rejected — you can only push under your own domain.

---

## Setting it up

Minimal config, single binary:

```yaml
# apoci.yaml
endpoint: 'https://foo.com'
```

```bash
apoci serve
```

The domain becomes your identity and your repo namespace. A registry token is auto-generated on first
run. Then just push:

```bash
TOKEN=$(cat /apoci/storage/registry.token)
docker login foo.com -u registry -p "$TOKEN"
docker push foo.com/myapp:v1
```

To federate with someone, you follow them and they accept — same mental model as the fediverse:

```bash
# on your node
apoci follow add bar.com

# on bar
apoci follow accept foo.com
```

After that, pushes replicate automatically in both directions. By default every follow requires manual
approval, which is what you want when you're building a small trust network rather than a public registry.

---

## A few other things worth mentioning

It also works as a pull-through cache for external registries. Sometimes you can't avoid pulling from
Docker Hub or GHCR — at least you can avoid doing it more than once. Configure the upstreams you need
and pull through your node:

```bash
docker pull foo.com/docker.io/library/nginx:latest
docker pull foo.com/ghcr.io/user/repo:tag
```

First pull fetches from upstream and caches locally. After that the upstream never sees the request
again. If a registry goes unreachable there's a circuit breaker per upstream so pulls fail fast rather
than hanging.

On the security side: every inbound activity requires an HTTP Signature (RSA-SHA256), replays are
rejected, and peer writes are scoped strictly to their own domain. A followed peer can't write to repos
it doesn't own.

One thing apoci is not: multi-tenant. It's a single-user registry, not a Harbor replacement. The target
is a small trust network of homelab operators who want resilience without depending on anyone else's
infrastructure.

---

```bash
go install git.erwanleboucher.dev/eleboucher/apoci/cmd/apoci@latest
```

Source is at [git.erwanleboucher.dev/eleboucher/apoci](https://git.erwanleboucher.dev/eleboucher/apoci)
or mirror is on GitHub at [github.com/eleboucher/apoci](https://github.com/eleboucher/apoci)
feel free to raise issues or contribute if you want to see features or help out.
If you're running a homelab and have ever wondered what happens when it dies, this is my answer.

```

```
