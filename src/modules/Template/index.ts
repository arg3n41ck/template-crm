/**
 * Модуль Template
 *
 * Пример модуля с использованием OpenAPI генерации хуков.
 *
 * Структура:
 * - hooks/ - кастомные хуки, использующие сгенерированные API хуки
 * - model/ - константы, типы (типы берутся из apiSchemas.ts)
 * - ui/ - UI компоненты
 *
 * API хуки генерируются из openapi.yml:
 * - useGetTemplates, useGetTemplate - получение данных
 * - useCreateTemplate, useUpdateTemplate, useDeleteTemplate - мутации
 *
 * Для добавления новых endpoints:
 * 1. Обновите openapi.yml
 * 2. Запустите: pnpm generate:api
 * 3. Используйте сгенерированные хуки из @shared/services/api/apiComponents
 */

// Hooks
export { useTemplates, useTemplateMutations } from './hooks'

// UI Components
export { TemplateList } from './ui/TemplateList'

// Constants
export { TemplateStatus, TemplateStatusLabels } from './model/constants'

// Types - реэкспорт из сгенерированных схем
export type {
  Template,
  CreateTemplateRequest,
  UpdateTemplateRequest,
  TemplateListResponse,
} from '@shared/services'
