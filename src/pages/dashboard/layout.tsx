import { Outlet, createFileRoute } from '@tanstack/react-router'

import {
  DashboardLayout,
  HeaderDashboard,
  SiderDashboard,
} from '@modules/common'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <DashboardLayout
      components={{
        header: <HeaderDashboard />,
        sider: <SiderDashboard />,
        body: <Outlet />,
      }}
    />
  )
}
