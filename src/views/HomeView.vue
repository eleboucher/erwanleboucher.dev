<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useMetrics } from '@/composables/useMetrics'
import { usePosts } from '@/composables/usePosts'
import { PRIMARY_STACK, GITHUB_USER } from '@/constants'
import type { MetricConfig } from '@/types'
import MainLayout from '@/layouts/MainLayout.vue'
import SparklineChart from '@/components/SparklineChart.vue'

const { posts } = usePosts()
const { metrics, loading, fetchDuration, startPolling } = useMetrics()


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
            class="stat-card group relative overflow-hidden"
            role="article"
            :class="metricBorder(m)"
            :aria-label="`${m.title}: ${m.val}`"
          >
            <SparklineChart v-if="m.history" :values="m.history" :id="m.key" />
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
            <SparklineChart v-if="m.history" :values="m.history" :id="m.key" />
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
