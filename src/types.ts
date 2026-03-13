export interface KromgoRawResponse {
  metric: Record<string, unknown>
  value: [number, string]
}

export interface KromgoEndpointResponse {
  message: string
  color: string
  label: string
  schemaVersion: number
}

export interface GitHubEvent {
  type: string
  repo: {
    name: string
  }
  created_at: string
}

export interface KromgoHistoryDataPoint {
  t: number
  v: number
}

export interface KromgoHistorySeries {
  labels: Record<string, unknown>
  data: KromgoHistoryDataPoint[]
}

export interface KromgoHistoryResponse {
  metric: string
  title: string
  start: number
  end: number
  step: number
  series: KromgoHistorySeries[]
}

export interface MetricConfig {
  val: string | number
  unit?: string
  title?: string
  key: string
  color?: string
  history?: number[]
}

export interface MetricsState {
  cpu: MetricConfig
  mem: MetricConfig
  pods: MetricConfig
  uptime: MetricConfig
  sla: MetricConfig
  cluster_latency: MetricConfig
  github_contributions: MetricConfig
  github_followers: MetricConfig
  github_public_repos: MetricConfig
  github_stars: MetricConfig
  gh_repo: MetricConfig
  gh_ago: MetricConfig
  talos: MetricConfig
  k8s: MetricConfig
  flux: MetricConfig
  alerts: MetricConfig
  routeros: MetricConfig
}

export interface SystemStatus {
  text: string
  color: string
  border: string
  bg: string
}

export interface GitHubStats {
  repo: string
  ago: string
  url: string
}

export interface Post {
  slug: string
  title: string
  date: string
  description: string
}
