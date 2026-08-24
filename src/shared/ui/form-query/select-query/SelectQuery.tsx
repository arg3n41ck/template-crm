import { X } from 'lucide-react'

import React from 'react'

import { useAppSearchParams } from '@shared/hooks'
import { cn } from '@shared/libs'
import { FormQuery } from '@shared/types'
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shared/ui'

interface SelectOption {
  label: string
  value: string | number
}

interface SelectQueryProps extends FormQuery {
  options?: SelectOption[]
  removeKeys?: ParamKey[]
  placeholder?: string
  className?: string
}

export function SelectQuery({
  options = [],
  queryKey,
  defaultValue,
  removeKeys,
  placeholder = 'Выберите значение',
  className,
  ...props
}: SelectQueryProps & Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>) {
  const { setParam, getParam, deleteParam } = useAppSearchParams({ removeKeys })
  const value = getParam(queryKey) || String(defaultValue ?? '')

  return (
    <div
      className={cn('flex min-w-[200px] items-center gap-1', className)}
      {...props}
    >
      <Select
        value={value || undefined}
        onValueChange={(nextValue) => setParam(queryKey, nextValue)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={String(option.value)}
              value={String(option.value)}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {value && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Очистить фильтр"
          onClick={() => deleteParam(queryKey)}
        >
          <X />
        </Button>
      )}
    </div>
  )
}
