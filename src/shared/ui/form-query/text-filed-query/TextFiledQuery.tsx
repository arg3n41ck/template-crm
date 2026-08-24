import React, { useEffect, useState } from 'react'

import { useAppSearchParams, useDebounce } from '@shared/hooks'
import { FormQuery } from '@shared/types'
import { Input } from '@shared/ui'

interface TextFiledQueryProps extends FormQuery {
  queryKey: ParamKey
  placeholder?: string
  removeKeys?: ParamKey[]
}

export function TextFiledQuery({
  queryKey,
  placeholder,
  removeKeys,
  ...props
}: TextFiledQueryProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>) {
  const { setParam, getParam } = useAppSearchParams({
    removeKeys,
  })
  const queryKeyValue = getParam(queryKey) || ''

  const [value, setValue] = useState(queryKeyValue)
  const debouncedValue = useDebounce(value, 700)

  useEffect(() => {
    if (debouncedValue !== queryKeyValue) {
      setParam(queryKey, debouncedValue as string)
    }
  }, [debouncedValue, queryKey, queryKeyValue, setParam])

  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setValue(e.currentTarget.value)
      }
      {...props}
    />
  )
}
