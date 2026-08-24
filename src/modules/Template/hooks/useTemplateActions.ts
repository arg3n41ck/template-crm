/**
 * Хук для действий с шаблонами (создание, обновление, удаление)
 *
 * Использует сгенерированные хуки из OpenAPI спецификации
 */
import { useQueryClient } from '@tanstack/react-query'

import {
  type CreateTemplateRequest,
  type UpdateTemplateRequest,
  useCreateTemplate,
  useDeleteTemplate,
  useUpdateTemplate,
} from '@shared/services'

// eslint-disable-next-line @typescript-eslint/naming-convention
export function useTemplateMutations() {
  const queryClient = useQueryClient()

  const invalidateTemplates = () => {
    queryClient.invalidateQueries({ queryKey: ['getTemplates'] })
  }

  const createMutation = useCreateTemplate({
    onSuccess: () => {
      invalidateTemplates()
    },
  })

  const updateMutation = useUpdateTemplate({
    onSuccess: () => {
      invalidateTemplates()
    },
  })

  const deleteMutation = useDeleteTemplate({
    onSuccess: () => {
      invalidateTemplates()
    },
  })

  const createTemplate = (data: CreateTemplateRequest) => {
    return createMutation.mutateAsync({ body: data })
  }

  const updateTemplate = (id: string, data: UpdateTemplateRequest) => {
    return updateMutation.mutateAsync({ pathParams: { id }, body: data })
  }

  const deleteTemplate = (id: string) => {
    return deleteMutation.mutateAsync({ pathParams: { id } })
  }

  return {
    createTemplate,
    updateTemplate,
    deleteTemplate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  }
}
