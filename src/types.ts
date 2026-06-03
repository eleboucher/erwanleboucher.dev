export interface KromgoEndpointResponse {
  value: string
  color: string
  result: number
}

export interface GitHubEvent {
  type: string
  repo: {
    name: string
  }
  created_at: string
}

export interface KromgoHistoryDataPoint {
  v: number
}

export interface KromgoHistorySeries {
  data: KromgoHistoryDataPoint[]
}

export interface KromgoHistoryResponse {
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
  posted: boolean
}
