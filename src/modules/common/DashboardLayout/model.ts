import { ReactNode } from 'react'

export interface DashboardLayoutProps {
  components?: {
    sider?: ReactNode
    header?: ReactNode
    body?: ReactNode
  }
}
