import { useNavigate, useSearch } from '@tanstack/react-router'

import { getOffset } from '@shared/libs'

import { PaginationConfig } from '../usePaginationState/usePaginationState'

const pageParam = 'page'
const limitParam = 'limit'

export const usePaginationQuery = () => {
  const navigate = useNavigate()
  const searchObject = (useSearch({ strict: false }) || {}) as Record<
    string,
    string
  >

  const searchParams = {
    get: (key: string) => searchObject[key] || null,
  }

  const setSearchParams = (newParams: Record<string, string>) => {
    navigate({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      search: (() => newParams) as any,
    })
  }

  const page = searchParams.get(pageParam) || '1'
  const limit = searchParams.get(limitParam) || '10'

  const set = (key: string, value: string) => {
    const newParams = { ...searchObject, [key]: value }
    setSearchParams(newParams)
  }

  const setPage = (value: string) => {
    set(pageParam, value)
  }
  const setView = (value: string) => {
    if (limit === value) {
      return
    }
    set(limitParam, value)
  }

  const onChangeConfig = (config: PaginationConfig) => {
    setPage(String(config.current || 1))

    setView(String(config.pageSize || 1))
  }

  const paginationConfig: PaginationConfig & { offset: string } = {
    current: Number(page),
    showSizeChanger: true,
    pageSize: Number(limit),
    offset: String(getOffset(Number(page), Number(limit))),
  }

  return { setPage, setView, paginationConfig, onChangeConfig }
}
