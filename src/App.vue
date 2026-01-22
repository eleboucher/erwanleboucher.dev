<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useMetrics } from './composables/useMetrics'
import { PRIMARY_STACK, GITHUB_USER } from './constants'
import type { SystemStatus, MetricConfig } from './types'

const { metrics, loading, error, fetchDuration, startPolling } = useMetrics()

const getMetricColorClasses = (metric: MetricConfig) => {
  switch (metric.color) {
    case 'green':
      return 'border-emerald-500/50 hover:border-emerald-500/70'
    case 'orange':
      return 'border-orange-500/50 hover:border-orange-500/70'
    case 'red':
      return 'border-red-500/50 hover:border-red-500/70'
    default:
      return 'border-zinc-800 hover:border-blue-500/30'
  }
}

const systemStatus = computed((): SystemStatus => {
  if (error.value)
    return {
      text: error.value || 'Connection Error',
      color: 'text-red-500',
      border: 'border-red-500/50',
      bg: 'bg-red-500',
    }

  const alertCount = metrics.value.alerts.val as number
  if (alertCount > 0)
    return {
      text: `${alertCount} Active Alert${alertCount > 1 ? 's' : ''}`,
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
  startPolling()
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
            <a
              href="mailto:erwanleboucher@gmail.com"
              class="email-link"
              aria-label="Send email to erwanleboucher@gmail.com"
            >
              erwanleboucher@gmail.com
            </a>
          </div>

          <div
            class="status-badge"
            :class="[systemStatus.border, systemStatus.color]"
            role="status"
            aria-live="polite"
          >
            <span class="status-dot animate-pulse" :class="systemStatus.bg"></span>
            {{ systemStatus.text }}
          </div>
        </div>
        <nav class="nav-links" aria-label="Social links">
          <a
            href="https://github.com/eleboucher"
            target="_blank"
            rel="noopener noreferrer"
            class="nav-link"
            aria-label="Visit GitHub profile"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/erwan-leboucher"
            target="_blank"
            rel="noopener noreferrer"
            class="nav-link"
            aria-label="Visit LinkedIn profile"
          >
            LinkedIn
          </a>
        </nav>
      </header>
      <main>
        <section class="metrics-grid section" aria-labelledby="github-metrics-heading">
          <h2 id="github-metrics-heading">GitHub Metrics</h2>
          <div></div>

          <div
            v-for="(m, key) in {
              github_contributions: metrics.github_contributions,
            }"
            :key="key"
            class="stat-card group"
            role="article"
            :class="getMetricColorClasses(m)"
            :aria-label="`${m.title}: ${m.val}`"
          >
            <span class="stat-title group-hover:text-zinc-400">
              {{ m.title }}
            </span>
            <div class="flex items-baseline gap-1">
              <span class="stat-value" :class="{ 'animate-pulse': loading }">
                {{ m.val }}
              </span>
            </div>
          </div>
          <a
            :href="`https://github.com/${GITHUB_USER}/${metrics.gh_repo.val}`"
            target="_blank"
            rel="noopener noreferrer"
            class="stat-card group cursor-pointer border-zinc-500 hover:border-blue-500/30"
            :aria-label="`Latest code push: ${metrics.gh_repo.val}, ${metrics.gh_ago.val}`"
          >
            <span class="stat-title group-hover:text-zinc-400 flex justify-between">
              Latest Code Push
            </span>
            <div class="flex flex-col">
              <span class="stat-value truncate" :class="{ 'animate-pulse': loading }">
                {{ metrics.gh_repo.val }}
              </span>
              <span class="text-xs text-zinc-400">{{ metrics.gh_ago.val }}</span>
            </div>
          </a>

          <div
            class="stat-card group border-zinc-800 hover:border-blue-500/30"
            role="article"
            :aria-label="`Primary Stack: ${PRIMARY_STACK.join(' and ')}`"
          >
            <span class="stat-title group-hover:text-zinc-400"> Primary Stack </span>
            <div class="flex items-baseline gap-1">
              <span class="stat-value">
                {{ PRIMARY_STACK.join(' • ') }}
              </span>
            </div>
          </div>
        </section>
        <section class="metrics-grid section" aria-labelledby="cluster-metrics-heading">
          <h2 id="cluster-metrics-heading">Cluster Metrics</h2>
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
            :class="getMetricColorClasses(m)"
            role="article"
            :aria-label="`${m.title}: ${m.val}`"
          >
            <span class="stat-title group-hover:text-zinc-400">
              {{ m.title }}
            </span>
            <div class="flex items-baseline gap-1">
              <span class="stat-value" :class="{ 'animate-pulse': loading }">
                {{ m.val }}
              </span>
            </div>
          </div>
        </section>
      </main>
      <footer class="footer-section" role="contentinfo">
        <div class="tech-stack">
          <span class="tech-pill" :aria-label="`Talos version ${metrics.talos.val}`">
            Talos {{ metrics.talos.val }}
          </span>
          <span class="tech-pill" :aria-label="`Kubernetes version ${metrics.k8s.val}`">
            K8s {{ metrics.k8s.val }}
          </span>
          <span class="tech-pill" :aria-label="`Flux version ${metrics.flux.val}`">
            Flux {{ metrics.flux.val }}
          </span>
          <span class="tech-pill" :aria-label="`RouterOS version ${metrics.routeros.val}`">
            RouterOS {{ metrics.routeros.val }}
          </span>
          <div class="text-[10px] text-zinc-400 mt-2 text-center" role="status" aria-live="polite">
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
  @apply bg-zinc-900/30 border p-5 rounded transition-all duration-300 relative;
  @apply hover:bg-zinc-900/60;
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
