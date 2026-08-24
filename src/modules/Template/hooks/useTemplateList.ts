/**
 * Хук для работы со списком шаблонов
 *
 * Использует сгенерированные хуки из OpenAPI спецификации
 */
import { useMemo } from 'react'

import { type GetTemplatesQueryParams, useGetTemplates } from '@shared/services'

import { DefaultPageSize, TemplateStatusLabels } from '../model/constants'

interface TemplateListParams {
  search?: string
  status?: string
  page?: number
  limit?: number
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function useTemplates(params: TemplateListParams = {}) {
  const { search, status, page = 1, limit = DefaultPageSize } = params

  const queryParams: GetTemplatesQueryParams = {
    ...(search && { search }),
    ...(status && { status: status as 'active' | 'inactive' | 'draft' }),
    page,
    limit,
  }

  const { data, isLoading, error, refetch } = useGetTemplates({
    queryParams: queryParams as GetTemplatesQueryParams &
      Record<string, unknown>,
  })

  const templates = useMemo(() => {
    if (!data?.data) return []

    return data.data.map((template) => ({
      ...template,
      statusLabel: TemplateStatusLabels[template.status] || template.status,
    }))
  }, [data?.data])

  return {
    templates,
    total: data?.total ?? 0,
    page: data?.page ?? page,
    limit: data?.limit ?? limit,
    isLoading,
    error,
    refetch,
  }
}
