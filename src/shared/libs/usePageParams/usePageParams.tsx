import { useParams } from '@tanstack/react-router'

export const usePageParams = () => {
  return useParams({ strict: false })
}
