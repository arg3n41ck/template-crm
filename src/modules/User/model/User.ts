import { UserRoleTypes } from './UserRole'

export interface User {
  avatar: string | null
  department: string | null
  first_name: string
  id: number
  last_name: string | null
  phone_number: string | null
  position: string | null
  role: UserRoleTypes
}
