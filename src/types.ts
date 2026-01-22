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

export interface MetricConfig {
  val: string | number
  unit?: string
  title?: string
  key: string
  color?: string
}

export interface MetricsState {
  cpu: MetricConfig
  mem: MetricConfig
  pods: MetricConfig
  uptime: MetricConfig
  sla: MetricConfig
  cluster_latency: MetricConfig
  github_contributions: MetricConfig
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
