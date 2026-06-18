<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import { useMetrics } from '../composables/useMetrics'
import { PRIMARY_STACK, GITHUB_USER } from '../constants'
import type { MetricConfig } from '../types'
import SparklineChart from './SparklineChart.vue'

const props = defineProps<{
  latestPost: { slug: string; title: string; description: string; date: string } | null
}>()

const { metrics, loaded, allLoaded, error, fetchDuration, startPolling } = useMetrics()

const COLOR_BORDER: Record<string, string> = {
  green: 'border-navy-500/50 hover:border-navy-500/70',
  orange: 'border-orange-500/50 hover:border-orange-500/70',
  red: 'border-red-500/50 hover:border-red-500/70',
}
const metricBorder = (m: MetricConfig) =>
  COLOR_BORDER[m.color ?? ''] ?? 'border-anthracite-700 hover:border-navy-500/30'

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

// Brief skeleton flash for static cards so they reveal in sync with async ones
const staticReady = ref(false)

onMounted(async () => {
  await nextTick()
  staticReady.value = true
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
      v-for="(m, i) in githubMetrics"
      :key="m.key"
      class="card group relative overflow-hidden"
      :class="[
        isLoaded(m.key) ? metricBorder(m) : 'border-anthracite-700',
        { loading: !isLoaded(m.key) },
      ]"
      :style="{ '--reveal-delay': `${i * 70}ms` }"
    >
      <SparklineChart v-if="isLoaded(m.key) && m.history" :values="m.history" :id="m.key" />
      <span v-if="isLoaded(m.key) && stateLabel(m)" class="card-state" :class="`state-${m.color}`">
        {{ stateLabel(m) }}
      </span>
      <span class="card-label group-hover:text-cream-300">{{ m.title }}</span>
      <span class="card-value card-value-metric">{{ m.val }}</span>
    </div>

    <component
      :is="isLoaded(metrics.gh_repo.key) ? 'a' : 'div'"
      :href="
        isLoaded(metrics.gh_repo.key)
          ? `https://github.com/${GITHUB_USER}/${metrics.gh_repo.val}`
          : undefined
      "
      :target="isLoaded(metrics.gh_repo.key) ? '_blank' : undefined"
      :rel="isLoaded(metrics.gh_repo.key) ? 'noopener noreferrer' : undefined"
      class="card card-link group border-anthracite-700"
      :class="{ loading: !isLoaded(metrics.gh_repo.key) }"
      :style="{ '--reveal-delay': '280ms' }"
      :aria-label="
        isLoaded(metrics.gh_repo.key)
          ? `Latest code push: ${metrics.gh_repo.val}, ${metrics.gh_ago.val} (opens in new tab)`
          : undefined
      "
    >
      <span class="card-label group-hover:text-cream-300">Latest Push</span>
      <span class="card-value truncate">{{ metrics.gh_repo.val }}</span>
      <span class="card-sub">{{ metrics.gh_ago.val }}</span>
    </component>

    <div
      class="card card-static group border-anthracite-700 hover:border-anthracite-600"
      :class="{ loading: !staticReady }"
      :style="{ '--reveal-delay': '350ms' }"
    >
      <span class="card-label group-hover:text-cream-300">Stack</span>
      <span class="card-value">{{ PRIMARY_STACK.join(' / ') }}</span>
    </div>
    <a
      v-if="latestPost"
      :href="`/blog/${latestPost.slug}`"
      class="card card-static card-link group col-span-full border-anthracite-700"
      :class="{ loading: !staticReady }"
      :style="{ '--reveal-delay': '420ms' }"
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
      v-for="(m, i) in clusterMetrics"
      :key="m.key"
      class="card group relative overflow-hidden"
      :class="[
        isLoaded(m.key) ? metricBorder(m) : 'border-anthracite-700',
        { loading: !isLoaded(m.key) },
      ]"
      :style="{ '--reveal-delay': `${i * 70}ms` }"
    >
      <SparklineChart v-if="isLoaded(m.key) && m.history" :values="m.history" :id="m.key" />

      <span class="card-label group-hover:text-cream-300">{{ m.title }}</span>
      <span class="card-value card-value-metric">{{ m.val }}</span>
    </div>
  </section>

  <footer class="footer" role="contentinfo">
    <div class="pill-row">
      <span
        v-for="p in versionPills"
        :key="p.label"
        class="pill"
        :class="{ loading: !isLoaded(p.key) }"
        :aria-label="`${p.label} version ${p.metric.val}`"
      >
        {{ p.label }} {{ p.metric.val }}
      </span>
    </div>
    <div v-if="error" class="fetch-error" role="status" aria-live="polite">
      some metrics are currently unavailable
    </div>
    <div v-else-if="allLoaded" class="fetch-time" aria-hidden="true">
      fetched in {{ fetchDuration }}ms
    </div>
  </footer>
</template>

<style scoped>
@reference '../app.css';

.section {
  @apply mb-12 border-b border-anthracite-800 pb-6;
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
  min-height: 6.5rem;
  animation: card-in 0.5s ease backwards;
  animation-delay: var(--reveal-delay, 0ms);
}

@keyframes card-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-link {
  @apply cursor-pointer no-underline border-l-2 border-l-navy-500/50;
  @apply hover:border-l-navy-400;
  @apply hover:shadow-[0_0_16px_rgba(74,142,200,0.2)];
}

.card-label {
  @apply block text-xs text-cream-500 uppercase tracking-[0.15em] mb-2;
  transition: color 0.5s ease;
}

.card-value {
  @apply text-2xl font-bold text-cream-100;
  transition: color 0.5s ease;
}

.card-value-metric {
  @apply text-4xl tracking-tight;
}

.card-state {
  @apply absolute top-5 right-5 text-[0.6rem] font-bold uppercase tracking-[0.15em];
}

.state-green {
  @apply text-[#3fb950];
}

.state-orange {
  @apply text-orange-400;
}

.state-red {
  @apply text-red-400;
}

.card-sub {
  @apply block text-sm text-cream-500 mt-1;
  transition: color 0.5s ease;
}

.footer {
  @apply pt-6 border-t border-anthracite-800;
}

.pill-row {
  @apply flex flex-wrap gap-2;
}

.pill {
  @apply px-2.5 py-1 border border-anthracite-700 rounded-md text-xs text-cream-400 uppercase tracking-wider;
  transition: color 0.5s ease;
}

.fetch-time {
  @apply text-xs text-cream-500 mt-3;
}

.fetch-error {
  @apply text-xs text-orange-400 mt-3;
}

/* Loading skeleton state */
.loading {
  @apply pointer-events-none;
}

.loading > :where(span, p, div:not(.sparkline)) {
  @apply rounded bg-anthracite-800/60 animate-pulse;
  color: transparent;
  width: fit-content;
  min-width: 5rem;
}

.loading.pill {
  @apply animate-pulse;
  color: transparent;
}
</style>
