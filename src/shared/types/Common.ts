export type CouldBeEmpty<T> = null | T

export interface PaginationResponse<T> {
  total_count?: number
  count?: number
  results: T[]
  currentOffset?: number
}

export type BooleanQuery = 'true' | 'false'
