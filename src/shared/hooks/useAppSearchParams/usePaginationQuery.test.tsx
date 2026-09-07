import { renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { usePaginationQuery } from './usePaginationQuery'

const mock = vi.hoisted(() => ({
  navigate: vi.fn(),
  search: {} as Record<string, unknown>,
}))
vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => mock.navigate,
  useSearch: () => mock.search,
}))
vi.mock('@shared/libs', () => ({
  getOffset: (page: number, limit: number) => (page - 1) * limit,
}))

describe('URL pagination', () => {
  beforeEach(() => {
    mock.navigate.mockClear()
    mock.search = { page: '3', limit: '10', q: 'demo' }
  })
  it('changes size and resets page in one navigation while preserving other keys', () => {
    const { result } = renderHook(() => usePaginationQuery())
    result.current.onChangeConfig({ current: 4, pageSize: 20 })
    expect(mock.navigate).toHaveBeenCalledTimes(1)
    expect(mock.navigate.mock.calls[0][0].search(mock.search)).toEqual({
      page: '1',
      limit: '20',
      q: 'demo',
    })
  })
  it('rejects malformed and out-of-range numeric params', () => {
    mock.search = { page: '-4', limit: '1000000' }
    const { result } = renderHook(() => usePaginationQuery())
    expect(result.current.paginationConfig).toMatchObject({
      current: 1,
      pageSize: 10,
      offset: '0',
    })
  })
  it('merges against latest router state rather than a stale render snapshot', () => {
    const { result } = renderHook(() => usePaginationQuery())
    result.current.setPage('5')
    expect(
      mock.navigate.mock.calls[0][0].search({ ...mock.search, q: 'new' }),
    ).toEqual({ page: '5', limit: '10', q: 'new' })
  })
})
