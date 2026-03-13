<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useMetrics } from '@/composables/useMetrics'
import { usePosts } from '@/composables/usePosts'
import { PRIMARY_STACK, GITHUB_USER } from '@/constants'
import type { MetricConfig } from '@/types'
import MainLayout from '@/layouts/MainLayout.vue'

const { posts } = usePosts()
const { metrics, loading, fetchDuration, startPolling } = useMetrics()

const buildSparklinePaths = (
  values: number[] | undefined,
  w = 100,
  h = 36,
): { line: string; area: string } => {
  if (!values || values.length < 2) return { line: '', area: '' }
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const pad = 3
  const pts = values.map((v, i) => ({
    x: (i / (values.length - 1)) * w,
    y: pad + (h - pad) - ((v - min) / range) * (h - pad),
  }))
  let d = `M${pts[0].x.toFixed(2)},${pts[0].y.toFixed(2)}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[Math.min(pts.length - 1, i + 2)]
    const cp1x = p1.x + (p2.x - p0.x) / 6
    const cp1y = p1.y + (p2.y - p0.y) / 6
    const cp2x = p2.x - (p3.x - p1.x) / 6
    const cp2y = p2.y - (p3.y - p1.y) / 6
    d += ` C${cp1x.toFixed(2)},${cp1y.toFixed(2)} ${cp2x.toFixed(2)},${cp2y.toFixed(2)} ${p2.x.toFixed(2)},${p2.y.toFixed(2)}`
  }
  return { line: d, area: `${d} L${w},${h} L0,${h} Z` }
}

const COLOR_BORDER: Record<string, string> = {
  green: 'border-emerald-500/50 hover:border-emerald-500/70',
  orange: 'border-orange-500/50 hover:border-orange-500/70',
  red: 'border-red-500/50 hover:border-red-500/70',
}
const metricBorder = (m: MetricConfig) =>
  COLOR_BORDER[m.color ?? ''] ?? 'border-zinc-800 hover:border-blue-500/30'

const githubMetrics = computed(() => [
  metrics.value.github_contributions,
  metrics.value.github_followers,
  metrics.value.github_public_repos,
  metrics.value.github_stars,
])

const clusterMetrics = computed(() => [
  metrics.value.cpu,
  metrics.value.mem,
  metrics.value.pods,
  metrics.value.uptime,
  metrics.value.sla,
  metrics.value.cluster_latency,
])

const versionPills = computed(() => [
  { label: 'Talos', metric: metrics.value.talos },
  { label: 'K8s', metric: metrics.value.k8s },
  { label: 'Flux', metric: metrics.value.flux },
  { label: 'RouterOS', metric: metrics.value.routeros },
])

onMounted(startPolling)
</script>

<template>
  <MainLayout>
    <main>
      <section class="metrics-grid section" aria-labelledby="github-metrics-heading">
        <h2 id="github-metrics-heading">GitHub Metrics</h2>

        <template v-if="loading">
          <div v-for="i in 6" :key="`skeleton-gh-${i}`" class="stat-card skeleton">
            <div class="skeleton-title"></div>
            <div class="skeleton-value"></div>
          </div>
        </template>

        <template v-else>
          <div
            v-for="m in githubMetrics"
            :key="m.key"
            class="stat-card group"
            role="article"
            :class="metricBorder(m)"
            :aria-label="`${m.title}: ${m.val}`"
          >
            <span class="stat-title group-hover:text-zinc-400">{{ m.title }}</span>
            <span class="stat-value">{{ m.val }}</span>
          </div>

          <RouterLink
            :to="`/blog/${posts[0].slug}`"
            class="stat-card group cursor-pointer border-zinc-500 hover:border-blue-500/30"
            :aria-label="`Latest post: ${posts[0].title}`"
          >
            <span class="stat-title group-hover:text-zinc-400">Latest Post</span>
            <div class="flex flex-col">
              <span class="stat-value truncate">{{ posts[0].title }}</span>
              <span class="text-sm text-zinc-400">{{ posts[0].date }}</span>
            </div>
          </RouterLink>

          <a
            :href="`https://github.com/${GITHUB_USER}/${metrics.gh_repo.val}`"
            target="_blank"
            rel="noopener noreferrer"
            class="stat-card group cursor-pointer border-zinc-500 hover:border-blue-500/30"
            :aria-label="`Latest code push: ${metrics.gh_repo.val}, ${metrics.gh_ago.val}`"
          >
            <span class="stat-title group-hover:text-zinc-400">Latest Code Push</span>
            <div class="flex flex-col">
              <span class="stat-value truncate">{{ metrics.gh_repo.val }}</span>
              <span class="text-sm text-zinc-400">{{ metrics.gh_ago.val }}</span>
            </div>
          </a>

          <div
            class="stat-card group border-zinc-800 hover:border-blue-500/30"
            role="article"
            :aria-label="`Primary Stack: ${PRIMARY_STACK.join(' and ')}`"
          >
            <span class="stat-title group-hover:text-zinc-400">Primary Stack</span>
            <span class="stat-value">{{ PRIMARY_STACK.join(' • ') }}</span>
          </div>
        </template>
      </section>

      <section class="metrics-grid section" aria-labelledby="cluster-metrics-heading">
        <h2 id="cluster-metrics-heading">Cluster Metrics</h2>

        <template v-if="loading">
          <div v-for="i in 6" :key="`skeleton-cluster-${i}`" class="stat-card skeleton">
            <div class="skeleton-title"></div>
            <div class="skeleton-value"></div>
          </div>
        </template>

        <template v-else>
          <div
            v-for="m in clusterMetrics"
            :key="m.key"
            class="stat-card group relative overflow-hidden"
            :class="metricBorder(m)"
            role="article"
            :aria-label="`${m.title}: ${m.val}`"
          >
            <svg
              v-if="m.history && m.history.length > 1"
              class="sparkline-bg"
              viewBox="0 0 100 36"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient :id="`sg-${m.key}`" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="white" stop-opacity="0.12" />
                  <stop offset="100%" stop-color="white" stop-opacity="0" />
                </linearGradient>
              </defs>
              <path
                :d="buildSparklinePaths(m.history).area"
                :fill="`url(#sg-${m.key})`"
                stroke="none"
              />
              <path
                :d="buildSparklinePaths(m.history).line"
                stroke="white"
                stroke-width="0.8"
                stroke-opacity="0.3"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                vector-effect="non-scaling-stroke"
              />
            </svg>
            <span class="stat-title group-hover:text-zinc-400">{{ m.title }}</span>
            <span class="stat-value">{{ m.val }}</span>
          </div>
        </template>
      </section>
    </main>

    <footer class="footer-section" role="contentinfo">
      <div class="tech-stack">
        <template v-if="loading">
          <span v-for="i in 4" :key="i" class="tech-pill skeleton">
            <div class="skeleton-tech"></div>
          </span>
          <div class="skeleton-duration skeleton"></div>
        </template>
        <template v-else>
          <span
            v-for="p in versionPills"
            :key="p.label"
            class="tech-pill"
            :aria-label="`${p.label} version ${p.metric.val}`"
          >
            {{ p.label }} {{ p.metric.val }}
          </span>
          <div class="text-xs text-zinc-400 mt-2 text-center" role="status" aria-live="polite">
            Dashboard updated in {{ fetchDuration }}ms
          </div>
        </template>
      </div>
    </footer>
  </MainLayout>
</template>

<style scoped>
@reference "../app.css";

.section {
  @apply flex flex-col mb-12 border-b border-zinc-800 pb-6 gap-4;
}

.metrics-grid {
  @apply grid grid-cols-1 md:grid-cols-2 gap-4;
}

.metrics-grid > h2 {
  @apply grid-cols-subgrid col-span-full text-xl font-bold text-zinc-100 tracking-tight;
}

.stat-card {
  @apply bg-zinc-900/30 border p-5 rounded transition-all duration-300;
  @apply hover:bg-zinc-900/60;
}

.sparkline-bg {
  @apply absolute inset-x-0 bottom-0 w-full;
  height: 60%;
  pointer-events: none;
}

.stat-title {
  @apply block text-sm font-medium text-zinc-300 uppercase tracking-widest mb-2 transition-colors;
}

.stat-value {
  @apply text-2xl font-bold text-zinc-100;
}

.footer-section {
  @apply space-y-6;
}

.tech-stack {
  @apply flex flex-wrap gap-2 text-xs text-zinc-300 uppercase font-medium tracking-wide;
}

.tech-pill {
  @apply px-2 py-1 border border-zinc-800 rounded bg-zinc-900/50;
}

.skeleton {
  @apply animate-pulse pointer-events-none;
}

.skeleton-title {
  @apply h-3 bg-zinc-700/50 rounded w-24 mb-3;
}

.skeleton-value {
  @apply h-8 bg-zinc-700/50 rounded w-32;
}

.skeleton-tech {
  @apply h-4 bg-zinc-700/50 rounded w-16;
}

.skeleton-duration {
  @apply h-3 bg-zinc-700/50 rounded w-40 mx-auto mt-2;
}
</style>
