/**
 * Константы модуля Template
 */

export const TemplateStatus = {
  Active: 'active',
  Inactive: 'inactive',
  Draft: 'draft',
} as const

export const TemplateStatusLabels: Record<string, string> = {
  [TemplateStatus.Active]: 'Активный',
  [TemplateStatus.Inactive]: 'Неактивный',
  [TemplateStatus.Draft]: 'Черновик',
}

export const DefaultPageSize = 10
