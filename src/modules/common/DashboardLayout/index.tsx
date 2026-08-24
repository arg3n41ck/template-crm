import { Menu } from 'lucide-react'

import {
  Button,
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@shared/ui'

import { DashboardLayoutProps } from './model'

export function DashboardLayout({ components }: DashboardLayoutProps) {
  return (
    <div className="flex h-[100svh] w-full bg-background">
      <div className="hidden shrink-0 md:block">{components?.sider}</div>
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <div className="flex items-center border-b md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="ml-2 shrink-0"
                aria-label="Открыть навигацию"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[280px] p-0"
            >
              <SheetTitle className="sr-only">Навигация</SheetTitle>
              {components?.sider}
            </SheetContent>
          </Sheet>
          <div className="min-w-0 flex-1">{components?.header}</div>
        </div>
        <div className="hidden md:block">{components?.header}</div>
        <main className="flex-1 overflow-auto">{components?.body}</main>
      </div>
    </div>
  )
}
