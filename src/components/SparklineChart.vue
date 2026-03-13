<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ values: number[]; id: string }>()

const buildPaths = (values: number[], w = 100, h = 36): { line: string; area: string } => {
  if (values.length < 2) return { line: '', area: '' }
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
  return { line: d, area: `${d} L${w},36 L0,36 Z` }
}

const paths = computed(() => buildPaths(props.values))
</script>

<template>
  <svg
    v-if="values.length > 1"
    class="sparkline"
    viewBox="0 0 100 36"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <defs>
      <linearGradient :id="`sg-${id}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="white" stop-opacity="0.12" />
        <stop offset="100%" stop-color="white" stop-opacity="0" />
      </linearGradient>
    </defs>
    <path :d="paths.area" :fill="`url(#sg-${id})`" stroke="none" />
    <path
      :d="paths.line"
      stroke="white"
      stroke-width="0.8"
      stroke-opacity="0.3"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      vector-effect="non-scaling-stroke"
    />
  </svg>
</template>

<style scoped>
.sparkline {
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  width: 100%;
  height: 60%;
  pointer-events: none;
}
</style>
