/**
 * Компонент списка шаблонов.
 *
 * Пример использования сгенерированных API-хуков.
 */
import { LoaderCircle } from 'lucide-react'

import type { FC } from 'react'

import { cn } from '@shared/libs'
import { Alert, AlertDescription, AlertTitle } from '@shared/ui'

import { useTemplates } from '../../hooks'
import { TemplateStatusLabels } from '../../model/constants'

interface TemplateListProps {
  search?: string
  status?: string
}

export const TemplateList: FC<TemplateListProps> = ({ search, status }) => {
  const { templates, total, isLoading, error } = useTemplates({
    search,
    status,
  })

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <LoaderCircle
          className="size-8 animate-spin text-muted-foreground"
          aria-label="Загрузка шаблонов"
        />
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Ошибка загрузки</AlertTitle>
        <AlertDescription>{String(error)}</AlertDescription>
      </Alert>
    )
  }

  if (templates.length === 0) {
    return <p className="p-4 text-muted-foreground">Шаблоны не найдены</p>
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Всего: {total}</p>

      <ul className="divide-y rounded-lg border bg-card">
        {templates.map((template) => (
          <li
            key={template.id}
            className="p-4 transition-colors hover:bg-muted/50"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <h3 className="font-medium">{template.name}</h3>
                {template.description && (
                  <p className="text-sm text-muted-foreground">
                    {template.description}
                  </p>
                )}
              </div>
              <span
                className={cn(
                  'shrink-0 rounded-full px-2 py-1 text-xs font-medium',
                  template.status === 'active' &&
                    'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200',
                  template.status === 'inactive' &&
                    'bg-destructive/10 text-destructive',
                  template.status !== 'active' &&
                    template.status !== 'inactive' &&
                    'bg-muted text-muted-foreground',
                )}
              >
                {TemplateStatusLabels[template.status]}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
