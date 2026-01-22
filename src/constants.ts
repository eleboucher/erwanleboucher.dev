export const KROMGO_BASE = 'https://kromgo.erwanleboucher.dev'
export const GITHUB_USER = 'eleboucher'

export const FETCH_INTERVAL_MS = 60_000
export const METRICS_PRECISION_PERCENTAGE = 1
export const SLA_PRECISION_PERCENTAGE = 2

export const TIME_UNITS = {
  YEAR: 31536000,
  MONTH: 2592000,
  DAY: 86400,
  HOUR: 3600,
  MINUTE: 60,
} as const

export const DEFAULT_METRIC_VALUE = '--'
export const DEFAULT_LOADING_TEXT = 'Loading...'

export const PRIMARY_STACK = ['Golang', 'Python'] as const
