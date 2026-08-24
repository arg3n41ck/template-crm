import { useNavigate, useSearch } from '@tanstack/react-router'
import dayjs, { Dayjs } from 'dayjs'

import { useMemo } from 'react'

import { DateFormats } from '@shared/libs'

const DefaultStartDate = dayjs().startOf('day')
const DefaultEndDate = dayjs().endOf('day')

export const useDateRangeFilters = (
  format: string = DateFormats.full_default,
  defaultStartDate: Dayjs = DefaultStartDate,
  defaultEndDate: Dayjs = DefaultEndDate,
) => {
  const { setQueryRangeFilters } = useQueryParamsFilters()
  const searchParams = useSearch({ strict: false }) as Record<string, string>

  const formattedDefaultStartDate = useMemo(
    () => defaultStartDate.format(format),
    [defaultStartDate, format],
  )
  const formattedDefaultEndDate = useMemo(
    () => defaultEndDate.format(format),
    [defaultEndDate, format],
  )

  const dateRangeValue = useMemo(() => {
    const searchObject = searchParams || {}
    const date_gte = searchObject['date_gte'] || formattedDefaultStartDate
    const date_lte = searchObject['date_lte'] || formattedDefaultEndDate
    return date_gte && date_lte ? `${date_gte}, ${date_lte}` : undefined
  }, [formattedDefaultEndDate, formattedDefaultStartDate, searchParams])

  const updateDateRange = (value: [Dayjs | null, Dayjs | null] | null) => {
    if (!value) {
      setQueryRangeFilters(null, null)
      return
    }
    const startDate = value[0]?.startOf('day').format(format)
    const endDate = value[1]?.endOf('day').format(format)
    setQueryRangeFilters(startDate, endDate)
  }

  return { dateRangeValue, updateDateRange }
}

export const useQueryParamsFilters = () => {
  const navigate = useNavigate()
  const searchObject = (useSearch({ strict: false }) || {}) as Record<
    string,
    string
  >

  const setQueryRangeFilters = (
    startDate: string | null | undefined,
    endDate: string | null | undefined,
  ) => {
    const newParams = { ...searchObject }

    if (startDate) {
      newParams['date_gte'] = startDate
    } else {
      delete newParams['date_gte']
    }

    if (endDate) {
      newParams['date_lte'] = endDate
    } else {
      delete newParams['date_lte']
    }

    navigate({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      search: (() => newParams) as any,
    })
  }

  return {
    setQueryRangeFilters,
  }
}
