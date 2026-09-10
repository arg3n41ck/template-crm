import { SidebarInset, SidebarProvider } from '@shared/ui'

import { DashboardLayoutProps } from './model'

export function DashboardLayout({ components }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      {components?.sider}
      <SidebarInset className="h-svh min-w-0 overflow-hidden">
        {components?.header}
        <main className="flex-1 overflow-auto">{components?.body}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
