import { ref, onUnmounted } from 'vue'
import type { MetricsState, KromgoEndpointResponse, KromgoHistoryResponse } from '../types'
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
    github_followers: { val: DEFAULT_METRIC_VALUE, title: 'Followers', key: 'github_followers' },
    github_public_repos: {
      val: DEFAULT_METRIC_VALUE,
      title: 'Public Repos',
      key: 'github_public_repos',
    },
    github_stars: { val: DEFAULT_METRIC_VALUE, title: 'Stars', key: 'github_stars_total' },
    gh_repo: { val: DEFAULT_LOADING_TEXT, key: 'github_last_push_info' },
    gh_ago: { val: DEFAULT_METRIC_VALUE, key: 'github_last_push_timestamp' },
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

  const fetchMetric = async (key: string): Promise<KromgoEndpointResponse> => {
    const res = await fetch(`${KROMGO_BASE}/${key}`)
    if (!res.ok) {
      throw new Error(`Failed to fetch ${key}: ${res.status} ${res.statusText}`)
    }
    const data = (await res.json()) as KromgoEndpointResponse
    return data
  }

  const fetchHistory = async (key: string): Promise<number[]> => {
    const res = await fetch(`${KROMGO_BASE}/${key}?format=history&last=7d`)
    if (!res.ok) return []
    const data = (await res.json()) as KromgoHistoryResponse
    return data.series?.[0]?.data?.map((p) => p.v) ?? []
  }

  const HISTORY_KEYS: Array<keyof MetricsState> = ['cpu', 'mem', 'pods', 'sla', 'cluster_latency']

  const fetchAllStats = () => {
    const start = performance.now()
    const keys = Object.keys(metrics.value) as Array<keyof MetricsState>
    let remaining = keys.length

    keys.forEach(async (dictKey) => {
      const config = metrics.value[dictKey]
      try {
        const response = await fetchMetric(config.key)
        if (response && response.message !== null) {
          const value = response.message
          config.color = response.color

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
              config.val = timeAgo(new Date(parseInt(value, 10) * 1000))
              break
            default:
              config.val = value
          }
        }
      } catch (err) {
        console.warn(`Failed to fetch ${config.key}:`, err)
      } finally {
        remaining--
        if (remaining === 0) {
          loading.value = false
          fetchDuration.value = Math.round(performance.now() - start)
        }
      }
    })

    HISTORY_KEYS.forEach(async (dictKey) => {
      const config = metrics.value[dictKey]
      try {
        config.history = await fetchHistory(config.key)
      } catch {
        // silently ignore history fetch failures
      }
    })
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
