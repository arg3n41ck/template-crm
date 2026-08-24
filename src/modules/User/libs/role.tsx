import { ReactNode } from 'react'

import { UserRoleTypes, userRole } from '../model/UserRole'

export interface ProtectedNodeByUseRole {
  roles: UserRoleTypes[]
  component: ReactNode
}

export const protectedNodeByUseRole = ({
  component,
  roles,
}: ProtectedNodeByUseRole) => {
  const { data } = {
    data: { role: userRole.editor.key as UserRoleTypes },
  }

  if (!data) {
    return
  }

  if (!roles.includes(data?.role)) {
    return undefined
  }
  return component
}
