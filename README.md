# Live Infrastructure Dashboard

A minimalist, real-time engineering portfolio running on my home Kubernetes cluster.
It visualizes live telemetry from my homelab (Talos Linux, Flux, K8s) and connects to the GitHub API to track my coding activity.

**Live Site:** [erwanleboucher.dev](https://erwanleboucher.dev)

## 🏗 Architecture

- **Frontend:** Vue 3 + TypeScript + Tailwind CSS (Single Page Application)
- **Backend / Metrics:** [Kromgo](https://github.com/kashalls/kromgo) running on Kubernetes
- **Infrastructure:** Talos Linux, Flux CD, Cloudflare Tunnels

## 🛠️ Setup & Development

```bash
# Install dependencies
bun install

# Run locally (with Vite Proxy for CORS)
bun run dev

# Build for production
bun run build
```
