<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

const KROMGO_BASE = 'https://kromgo.erwanleboucher.dev'
const GITHUB_USER = 'eleboucher'

const metrics = ref({
  cpu: { val: '--', title: 'CPU Load', key: 'cluster_cpu_usage' },
  mem: { val: '--', title: 'Memory', key: 'cluster_memory_usage' },
  pods: { val: '--', title: 'Active Pods', key: 'cluster_pod_count' },
  uptime: { val: '--', title: 'Uptime', key: 'cluster_uptime_days' },
  sla: { val: '--', unit: '%', title: 'SLA (7d)', key: 'global_sla' },
  cluster_latency: {
    val: '--',
    unit: 'ms',
    title: 'Global P99 (7d)',
    key: 'cluster_latency_over_7d',
  },
  github_contributions: {
    val: '--',
    title: 'Contributions (1y)',
    key: 'gh_contributions_year',
  },
  gh_repo: { val: 'Loading...', key: 'gh_last_push_repo' },
  gh_ago: { val: '--', key: 'gh_last_push_time' },
  // Tech specs (Footer)
  talos: { val: 'Unknown', key: 'talos_version' },
  k8s: { val: 'Unknown', key: 'kubernetes_version' },
  flux: { val: 'Unknown', key: 'flux_version' },
  alerts: { val: 0, key: 'cluster_alert_count' },
  routeros: { val: 'Unknown', key: 'mkt_version' },
})

const primaryStack = ['Golang', 'Python']

const loading = ref(true)
const error = ref(false)
const fetchDuration = ref(0)
const fetchMetric = async (key: string) => {
  const res = await fetch(`${KROMGO_BASE}/${key}`)
  if (!res.ok) throw new Error(`Failed to fetch ${key}`)
  const data = await res.json()
  return data.message
}

const fetchAllStats = async () => {
  const start = performance.now()
  try {
    const keys = Object.keys(metrics.value) as Array<keyof typeof metrics.value>
    const promises = keys.map(async (dictKey) => {
      const config = metrics.value[dictKey]
      const value = await fetchMetric(config.key)
      if (value !== null) {
        switch (dictKey) {
          case 'cpu':
          case 'mem':
            config.val = `${parseFloat(value).toFixed(1)}%`
            break
          case 'sla':
            config.val = `${parseFloat(value).toFixed(2)}%`
            break
          case 'uptime':
            config.val = `${parseInt(value, 10)} days`
            break
          case 'cluster_latency':
            config.val = `${parseInt(value, 10)} ms`
            break
          case 'gh_ago':
            config.val = timeAgo(new Date(value))
            break
          default:
            config.val = value
        }
      }
    })

    await Promise.all(promises)
    loading.value = false
    error.value = false
  } catch {
    error.value = true
    loading.value = false
  } finally {
    const end = performance.now()
    fetchDuration.value = Math.round(end - start)
  }
}

const timeAgo = (date: Date) => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
  let interval = seconds / 31536000
  if (interval > 1) return Math.floor(interval) + 'y ago'
  interval = seconds / 2592000
  if (interval > 1) return Math.floor(interval) + 'mo ago'
  interval = seconds / 86400
  if (interval > 1) return Math.floor(interval) + 'd ago'
  interval = seconds / 3600
  if (interval > 1) return Math.floor(interval) + 'h ago'
  interval = seconds / 60
  if (interval > 1) return Math.floor(interval) + 'm ago'
  return 'just now'
}

const systemStatus = computed(() => {
  if (error.value)
    return {
      text: 'Connection Error',
      color: 'text-red-500',
      border: 'border-red-500/50',
      bg: 'bg-red-500',
    }

  const alertCount = metrics.value.alerts.val
  if (alertCount > 0)
    return {
      text: `${alertCount} Active Alerts`,
      color: 'text-orange-400',
      border: 'border-orange-400/50',
      bg: 'bg-orange-400',
    }

  return {
    text: 'All Systems Operational',
    color: 'text-emerald-400',
    border: 'border-emerald-400/50',
    bg: 'bg-emerald-400',
  }
})

onMounted(() => {
  fetchAllStats()
  setInterval(fetchAllStats, 60000)
})
</script>

<template>
  <div class="dashboard-layout">
    <div class="content-wrapper">
      <header class="section">
        <div class="identity-block">
          <div>
            <h1>Erwan Leboucher</h1>
            <p class="subtitle">Senior Software Engineer • Paris</p>
            <a href="mailto:erwanleboucher@gmail.com" class="email-link">
              erwanleboucher@gmail.com
            </a>
          </div>

          <div class="status-badge" :class="[systemStatus.border, systemStatus.color]">
            <span class="status-dot animate-pulse" :class="systemStatus.bg"></span>
            {{ systemStatus.text }}
          </div>
        </div>
        <nav class="nav-links">
          <a href="https://github.com/eleboucher" target="_blank" class="nav-link"> GitHub </a>
          <a href="https://linkedin.com/in/erwan-leboucher" target="_blank" class="nav-link">
            LinkedIn
          </a>
        </nav>
      </header>
      <main>
        <section class="metrics-grid section">
          <h1>GitHub Metrics</h1>
          <div></div>

          <div
            v-for="(m, key) in {
              github_contributions: metrics.github_contributions,
            }"
            :key="key"
            class="stat-card group"
          >
            <span class="stat-title group-hover:text-zinc-400">
              {{ m.title }}
            </span>
            <div class="flex items-baseline gap-1">
              <span class="stat-value">{{ m.val }}</span>
            </div>
          </div>
          <a
            :href="`https://github.com/${GITHUB_USER}/${metrics.gh_repo.val}`"
            target="_blank"
            class="stat-card group cursor-pointer hover:border-zinc-600"
          >
            <span class="stat-title group-hover:text-zinc-400 flex justify-between">
              Latest Code Push
            </span>
            <div class="flex flex-col">
              <span class="stat-value truncate">{{ metrics.gh_repo.val }}</span>
              <span class="text-xs text-zinc-400">{{ metrics.gh_ago.val }}</span>
            </div>
          </a>

          <div class="stat-card group">
            <span class="stat-title group-hover:text-zinc-400"> Primary Stack </span>
            <div class="flex items-baseline gap-1">
              <span class="stat-value">
                {{ primaryStack.join(' • ') }}
              </span>
            </div>
          </div>
        </section>
        <section class="metrics-grid section">
          <h1>Cluster Metrics</h1>
          <div></div>
          <div
            v-for="(m, key) in {
              cpu: metrics.cpu,
              mem: metrics.mem,
              pods: metrics.pods,
              uptime: metrics.uptime,
              sla: metrics.sla,
              cluster_latency: metrics.cluster_latency,
            }"
            :key="key"
            class="stat-card group"
          >
            <span class="stat-title group-hover:text-zinc-400">
              {{ m.title }}
            </span>
            <div class="flex items-baseline gap-1">
              <span class="stat-value">{{ m.val }}</span>
            </div>
          </div>
        </section>
      </main>
      <footer class="footer-section">
        <div class="tech-stack">
          <span class="tech-pill">Talos {{ metrics.talos.val }}</span>
          <span class="tech-pill">K8s {{ metrics.k8s.val }}</span>
          <span class="tech-pill">Flux {{ metrics.flux.val }}</span>
          <span class="tech-pill">RouterOS {{ metrics.routeros.val }}</span>
          <div class="text-[10px] text-zinc-400 mt-2 text-center">
            Dashboard updated in {{ fetchDuration }}ms
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped>
@reference "./app.css";
.dashboard-layout {
  @apply min-h-screen flex items-center justify-center p-6 selection:bg-emerald-500/30;
}

.content-wrapper {
  @apply w-full max-w-2xl;
}

.section {
  @apply flex flex-col mb-12 border-b border-zinc-800 pb-6 gap-4;
}

.identity-block {
  @apply flex flex-col md:flex-row justify-between items-start;
}

.identity-block h1 {
  @apply text-xl font-bold text-zinc-100 tracking-tight;
}

.subtitle {
  @apply text-sm text-zinc-400 mt-1;
}

.email-link {
  @apply text-xs text-blue-400 hover:text-blue-300 mt-2 block transition-colors;
}

.status-badge {
  @apply flex items-center gap-2 px-3 py-1.5 border rounded bg-zinc-900/50 text-[10px] uppercase tracking-wider transition-colors;
}

.status-dot {
  @apply w-1.5 h-1.5 rounded-full;
}

.metrics-grid {
  @apply grid grid-cols-1 md:grid-cols-2 gap-4;
}

.stat-card {
  @apply bg-zinc-900/30 border border-zinc-800 p-5 rounded transition-all duration-300 relative;
  @apply hover:border-blue-500/30 hover:bg-zinc-900/60;
}

.stat-title {
  @apply block text-xs font-medium text-zinc-300 uppercase tracking-widest mb-2 transition-colors;
}

.stat-value {
  @apply text-2xl font-bold text-zinc-100;
}

/* Footer */
.footer-section {
  @apply space-y-6;
}

.nav-links {
  @apply flex flex-wrap gap-6 text-sm;
}

.nav-link {
  @apply text-zinc-400 hover:text-zinc-200 transition-colors;
}

.nav-link.primary {
  @apply text-zinc-100 border-b border-zinc-700 pb-0.5 hover:border-emerald-400 hover:text-emerald-400;
}

.tech-stack {
  @apply flex flex-wrap gap-2 text-[10px] text-zinc-300 uppercase font-medium tracking-wide;
}

.tech-pill {
  @apply px-2 py-1 border border-zinc-800 rounded bg-zinc-900/50;
}
</style>
