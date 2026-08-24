// Client
export { apiClient } from './client/apiClient'
export {
  apiFetch,
  type ErrorWrapper,
  type ApiFetcherOptions,
} from './client/apiFetcher'

// Generated hooks and types
export * from './generated/apiComponents'
export * from './generated/apiSchemas'

// Context and utils
export { useApiContext, queryKeyFn, type ApiContext } from './apiContext'
export { deepMerge } from './apiUtils'
