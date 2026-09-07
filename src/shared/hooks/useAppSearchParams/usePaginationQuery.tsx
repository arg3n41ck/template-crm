import { useNavigate, useSearch } from '@tanstack/react-router'

import { getOffset } from '@shared/libs'

import { PaginationConfig } from '../usePaginationState/usePaginationState'

const boundedInteger = (value: unknown, fallback: number, max: number) => {
  if (typeof value !== 'string' && typeof value !== 'number') return fallback
  if (!/^[1-9]\d*$/.test(String(value))) return fallback
  const number = Number(value)
  return Number.isSafeInteger(number) && number <= max ? number : fallback
}

export const usePaginationQuery = () => {
  const navigate = useNavigate()
  const search = useSearch({ strict: false }) as Record<string, unknown>
  const page = boundedInteger(search.page, 1, 1_000_000)
  const limit = boundedInteger(search.limit, 10, 100)

  const update = (patch: Record<string, string>) =>
    navigate({
      // Compatibility boundary: legacy routes do not declare validateSearch.
      // New routes must use a typed route-owned search schema.
      search: ((previous: Record<string, unknown>) => ({
        ...previous,
        ...patch,
      })) as any, // eslint-disable-line @typescript-eslint/no-explicit-any
      hash: true,
      resetScroll: false,
    })
  const setPage = (value: string) =>
    update({ page: String(boundedInteger(value, 1, 1_000_000)) })
  const setView = (value: string) => {
    const next = boundedInteger(value, 10, 100)
    if (next !== limit) return update({ limit: String(next), page: '1' })
  }
  const onChangeConfig = (config: PaginationConfig) => {
    const nextLimit = boundedInteger(config.pageSize ?? limit, 10, 100)
    return update({
      page: String(
        nextLimit === limit
          ? boundedInteger(config.current ?? page, 1, 1_000_000)
          : 1,
      ),
      limit: String(nextLimit),
    })
  }
  const paginationConfig: PaginationConfig & { offset: string } = {
    current: page,
    showSizeChanger: true,
    pageSize: limit,
    offset: String(getOffset(page, limit)),
  }
  return { setPage, setView, paginationConfig, onChangeConfig }
}
