import { Navigate } from '@tanstack/react-router'

import { ReactNode } from 'react'

import { ContentLoader } from '@shared/ui'

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  // TODO: Implement real authentication check
  // Example: const { data: user, isLoading, isError } = useGetCurrentUserQuery()
  // For now, this is a placeholder that always allows access
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

  return <div>{children}</div>
}
