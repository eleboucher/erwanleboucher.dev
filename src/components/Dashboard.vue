<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useMetrics } from '../composables/useMetrics'
import { PRIMARY_STACK, GITHUB_USER } from '../constants'
import type { MetricConfig } from '../types'
import SparklineChart from './SparklineChart.vue'

const props = defineProps<{
  latestPost: { slug: string; title: string; description: string; date: string }
}>()

const { metrics, loaded, allLoaded, fetchDuration, startPolling } = useMetrics()

const COLOR_BORDER: Record<string, string> = {
  green: 'border-navy-500/50 hover:border-navy-500/70',
  orange: 'border-orange-500/50 hover:border-orange-500/70',
  red: 'border-red-500/50 hover:border-red-500/70',
}
const metricBorder = (m: MetricConfig) =>
  COLOR_BORDER[m.color ?? ''] ?? 'border-anthracite-800 hover:border-navy-500/30'

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
  { label: 'Talos', key: metrics.value.talos.key, metric: metrics.value.talos },
  { label: 'K8s', key: metrics.value.k8s.key, metric: metrics.value.k8s },
  { label: 'Flux', key: metrics.value.flux.key, metric: metrics.value.flux },
  { label: 'RouterOS', key: metrics.value.routeros.key, metric: metrics.value.routeros },
])

const isLoaded = (key: string) => !!loaded[key]

onMounted(() => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(startPolling)
  } else {
    setTimeout(startPolling, 200)
  }
})
</script>

<template>
  <section class="metrics-grid section" aria-labelledby="github-metrics-heading">
    <h2 id="github-metrics-heading">GitHub Metrics</h2>
    <div
      v-for="m in githubMetrics"
      :key="m.key"
      class="card group relative overflow-hidden"
      :class="[
        isLoaded(m.key) ? metricBorder(m) : 'border-anthracite-800',
        { skeleton: !isLoaded(m.key) },
      ]"
      role="article"
      :aria-label="`${m.title}: ${m.val}`"
    >
      <template v-if="isLoaded(m.key)">
        <SparklineChart v-if="m.history" :values="m.history" :id="m.key" />
        <span class="card-label group-hover:text-cream-300">{{ m.title }}</span>
        <span class="card-value">{{ m.val }}</span>
      </template>
      <template v-else>
        <div class="skeleton-label"></div>
        <div class="skeleton-value"></div>
      </template>
    </div>

    <a
      :href="`https://github.com/${GITHUB_USER}/${metrics.gh_repo.val}`"
      target="_blank"
      rel="noopener noreferrer"
      class="card card-link group border-anthracite-800"
      :class="{ skeleton: !isLoaded(metrics.gh_repo.key) }"
      :aria-label="`Latest code push: ${metrics.gh_repo.val}, ${metrics.gh_ago.val}`"
    >
      <template v-if="isLoaded(metrics.gh_repo.key)">
        <span class="card-label group-hover:text-cream-300">Latest Push</span>
        <div class="flex flex-col">
          <span class="card-value truncate">{{ metrics.gh_repo.val }}</span>
          <span class="text-sm text-cream-500 mt-1">{{ metrics.gh_ago.val }}</span>
        </div>
      </template>
      <template v-else>
        <div class="skeleton-label"></div>
        <div class="skeleton-value"></div>
      </template>
    </a>

    <div
      class="card group border-anthracite-800 hover:border-anthracite-700"
      role="article"
      :aria-label="`Primary Stack: ${PRIMARY_STACK.join(' and ')}`"
    >
      <span class="card-label group-hover:text-cream-300">Stack</span>
      <span class="card-value">{{ PRIMARY_STACK.join(' / ') }}</span>
    </div>
    <a
      :href="`/blog/${latestPost.slug}`"
      class="card card-link group col-span-full border-anthracite-800"
      :aria-label="`Latest post: ${latestPost.title}`"
    >
      <span class="card-label group-hover:text-cream-300">Latest Post</span>
      <span class="card-value">{{ latestPost.title }}</span>
      <p class="text-sm text-cream-400 mt-2 leading-relaxed">{{ latestPost.description }}</p>
      <span class="text-xs text-cream-500 mt-3 block">{{ latestPost.date }}</span>
    </a>
  </section>

  <section class="metrics-grid section" aria-labelledby="cluster-metrics-heading">
    <h2 id="cluster-metrics-heading">Cluster Metrics</h2>
    <div
      v-for="m in clusterMetrics"
      :key="m.key"
      class="card group relative overflow-hidden"
      :class="[
        isLoaded(m.key) ? metricBorder(m) : 'border-anthracite-800',
        { skeleton: !isLoaded(m.key) },
      ]"
      role="article"
      :aria-label="`${m.title}: ${m.val}`"
    >
      <template v-if="isLoaded(m.key)">
        <SparklineChart v-if="m.history" :values="m.history" :id="m.key" />
        <span class="card-label group-hover:text-cream-300">{{ m.title }}</span>
        <span class="card-value">{{ m.val }}</span>
      </template>
      <template v-else>
        <div class="skeleton-label"></div>
        <div class="skeleton-value"></div>
      </template>
    </div>
  </section>

  <footer class="footer" role="contentinfo">
    <div class="pill-row">
      <span
        v-for="p in versionPills"
        :key="p.label"
        class="pill"
        :class="{ skeleton: !isLoaded(p.key) }"
        :aria-label="`${p.label} version ${p.metric.val}`"
      >
        <template v-if="isLoaded(p.key)"> {{ p.label }} {{ p.metric.val }} </template>
        <template v-else>
          <div class="skeleton-pill"></div>
        </template>
      </span>
    </div>
    <div v-if="allLoaded" class="fetch-time" role="status" aria-live="polite">
      fetched in {{ fetchDuration }}ms
    </div>
  </footer>
</template>

<style scoped>
@reference '../app.css';

.section {
  @apply flex flex-col mb-12 border-b border-anthracite-800 pb-6 gap-4;
}

.metrics-grid {
  @apply grid grid-cols-1 md:grid-cols-2 gap-4;
}

.metrics-grid > h2 {
  @apply grid-cols-subgrid col-span-full text-xl font-bold text-cream-100 tracking-tight pl-3 border-l-2 border-navy-500;
}

.card {
  @apply bg-anthracite-900/40 border p-5 rounded-md transition-all duration-400;
  @apply hover:shadow-[0_0_12px_rgba(74,142,200,0.15)];
}

.card-link {
  @apply cursor-pointer no-underline border-l-2 border-l-navy-500/50;
  @apply hover:border-l-navy-400;
  @apply hover:shadow-[0_0_16px_rgba(74,142,200,0.2)];
}

.card-label {
  @apply block text-xs text-cream-500 uppercase tracking-[0.15em] mb-2 transition-colors;
}

.card-value {
  @apply text-2xl font-bold text-cream-100;
}

.footer {
  @apply pt-6 border-t border-anthracite-800;
}

.pill-row {
  @apply flex flex-wrap gap-2;
}

.pill {
  @apply px-2.5 py-1 border border-anthracite-800 rounded-md text-xs text-cream-400 uppercase tracking-wider;
}

.fetch-time {
  @apply text-xs text-cream-500 mt-3;
}

.skeleton {
  @apply animate-pulse pointer-events-none;
}

.skeleton-label {
  @apply h-3 bg-anthracite-800/60 w-24 mb-3;
}

.skeleton-value {
  @apply h-8 bg-anthracite-800/60 w-32;
}

.skeleton-pill {
  @apply h-4 bg-anthracite-800/60 w-16;
}
</style>
