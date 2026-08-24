import { Navigate } from '@tanstack/react-router'

import { ContentLoader } from '@shared/ui'

export function RedirectByRole() {
  const { isLoading, isError } = {
    isLoading: false,
    isError: false,
  }

  if (isLoading) {
    return <ContentLoader />
  }

  if (isError) {
    return <Navigate to={'/auth/sign-in'} />
  }
  return <Navigate to="/dashboard/template" />
}
