import { useState } from 'react'

import { getOffset } from '@shared/libs'

const pageParam = 'page'
const limitParam = 'limit'

// Define pagination config type locally
export interface PaginationConfig {
  current?: number
  showSizeChanger?: boolean
  pageSize?: number
  total?: number
  onChange?: (page: number, pageSize: number) => void
  onShowSizeChange?: (current: number, size: number) => void
}

export const usePaginationState = () => {
  const [state, setState] = useState({
    limit: 10,
    page: 1,
  })

  const page = state.page
  const limit = state.limit

  const set = (key: string, value: string | number) => {
    setState((prev) => {
      return {
        ...prev,
        [key]: value,
      }
    })
  }

  const setPage = (value: number) => {
    set(pageParam, value)
  }
  const setView = (value: number) => {
    if (limit === value) {
      return
    }
    set(limitParam, value)
  }

  const onChangeConfig = (config: PaginationConfig) => {
    setPage(config.current || 1)
    setView(config.pageSize || 1)
  }

  const paginationConfig: PaginationConfig & { offset: number } = {
    current: Number(page),
    showSizeChanger: true,
    pageSize: Number(limit),
    offset: getOffset(Number(page), Number(limit)),
  }

  return { setPage, setView, paginationConfig, onChangeConfig }
}
