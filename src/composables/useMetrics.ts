import { ref, onUnmounted } from 'vue'
import type { MetricsState, KromgoResponse } from '../types'
import {
  KROMGO_BASE,
  FETCH_INTERVAL_MS,
  METRICS_PRECISION_PERCENTAGE,
  SLA_PRECISION_PERCENTAGE,
  DEFAULT_METRIC_VALUE,
  DEFAULT_LOADING_TEXT,
  TIME_UNITS,
} from '../constants'

const timeAgo = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)

  let interval = seconds / TIME_UNITS.YEAR
  if (interval > 1) return Math.floor(interval) + 'y ago'

  interval = seconds / TIME_UNITS.MONTH
  if (interval > 1) return Math.floor(interval) + 'mo ago'

  interval = seconds / TIME_UNITS.DAY
  if (interval > 1) return Math.floor(interval) + 'd ago'

  interval = seconds / TIME_UNITS.HOUR
  if (interval > 1) return Math.floor(interval) + 'h ago'

  interval = seconds / TIME_UNITS.MINUTE
  if (interval > 1) return Math.floor(interval) + 'm ago'

  return 'just now'
}

export function useMetrics() {
  const metrics = ref<MetricsState>({
    cpu: { val: DEFAULT_METRIC_VALUE, title: 'CPU Load', key: 'cluster_cpu_usage' },
    mem: { val: DEFAULT_METRIC_VALUE, title: 'Memory', key: 'cluster_memory_usage' },
    pods: { val: DEFAULT_METRIC_VALUE, title: 'Active Pods', key: 'cluster_pod_count' },
    uptime: { val: DEFAULT_METRIC_VALUE, title: 'Uptime', key: 'cluster_age_days' },
    sla: { val: DEFAULT_METRIC_VALUE, unit: '%', title: 'SLA (7d)', key: 'global_sla' },
    cluster_latency: {
      val: DEFAULT_METRIC_VALUE,
      unit: 'ms',
      title: 'Global P99 (7d)',
      key: 'cluster_latency_over_7d',
    },
    github_contributions: {
      val: DEFAULT_METRIC_VALUE,
      title: 'Contributions (1y)',
      key: 'gh_contributions_year',
    },
    gh_repo: { val: DEFAULT_LOADING_TEXT, key: 'gh_last_push_repo' },
    gh_ago: { val: DEFAULT_METRIC_VALUE, key: 'gh_last_push_time' },
    talos: { val: 'Unknown', key: 'talos_version' },
    k8s: { val: 'Unknown', key: 'kubernetes_version' },
    flux: { val: 'Unknown', key: 'flux_version' },
    alerts: { val: 0, key: 'cluster_alert_count' },
    routeros: { val: 'Unknown', key: 'mkt_version' },
  })

  const loading = ref(true)
  const error = ref<string | null>(null)
  const fetchDuration = ref(0)
  let intervalId: number | null = null

  const fetchMetric = async (key: string): Promise<string> => {
    const res = await fetch(`${KROMGO_BASE}/${key}`)
    if (!res.ok) {
      throw new Error(`Failed to fetch ${key}: ${res.status} ${res.statusText}`)
    }
    const data = (await res.json()) as KromgoResponse
    return data.message
  }

  const fetchAllStats = async () => {
    const start = performance.now()
    try {
      const keys = Object.keys(metrics.value) as Array<keyof MetricsState>
      const promises = keys.map(async (dictKey) => {
        const config = metrics.value[dictKey]
        try {
          const value = await fetchMetric(config.key)
          if (value !== null) {
            switch (dictKey) {
              case 'cpu':
              case 'mem':
                config.val = `${parseFloat(value).toFixed(METRICS_PRECISION_PERCENTAGE)}%`
                break
              case 'sla':
                config.val = `${parseFloat(value).toFixed(SLA_PRECISION_PERCENTAGE)}%`
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
        } catch (err) {
          console.warn(`Failed to fetch ${config.key}:`, err)
        }
      })

      await Promise.all(promises)
      loading.value = false
      error.value = null
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      console.error('Failed to fetch metrics:', errorMessage)
      error.value = errorMessage
      loading.value = false
    } finally {
      const end = performance.now()
      fetchDuration.value = Math.round(end - start)
    }
  }

  const startPolling = () => {
    fetchAllStats()
    intervalId = window.setInterval(fetchAllStats, FETCH_INTERVAL_MS)
  }

  const stopPolling = () => {
    if (intervalId !== null) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  onUnmounted(() => {
    stopPolling()
  })

  return {
    metrics,
    loading,
    error,
    fetchDuration,
    fetchAllStats,
    startPolling,
    stopPolling,
  }
}
