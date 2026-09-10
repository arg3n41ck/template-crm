import { useLocation } from '@tanstack/react-router'
import { Bell, ChevronDown, Plus, Search, Settings } from 'lucide-react'

import { useMemo } from 'react'

import { helpMenu, mainMenu, secondMenu } from '@modules/common'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input,
  Separator,
  SidebarTrigger,
} from '@shared/ui'

const pageTitleMap: Record<string, string> = Object.fromEntries(
  [...mainMenu, ...secondMenu, ...helpMenu].flatMap((item) => {
    const entries: [string, string][] = [[item.key, item.label]]
    item.children?.forEach((child) => entries.push([child.key, child.label]))
    return entries
  }),
)

export function HeaderDashboard() {
  const { pathname } = useLocation()

  const pageTitle = useMemo(() => {
    const segment = pathname.split('/')[2]
    return pageTitleMap[segment] || 'Dashboard'
  }, [pathname])

  return (
    <header className="flex w-full items-center justify-between gap-4 border-b bg-background px-4 py-4 lg:px-10">
      <div className="flex min-w-0 items-center gap-2">
        <SidebarTrigger
          className="shrink-0"
          aria-label="Переключить боковую панель"
        />
        <Separator
          orientation="vertical"
          className="h-4"
        />
        <h1 className="truncate text-lg font-bold leading-6">{pageTitle}</h1>
      </div>

      <div className="flex items-center gap-2 lg:gap-4">
        <div className="relative hidden w-64 lg:block">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Поиск"
            aria-label="Поиск"
            className="pl-9"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>
              <Plus />
              <span className="hidden sm:inline">Добавить</span>
              <ChevronDown className="hidden sm:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Сотрудника</DropdownMenuItem>
            <DropdownMenuItem>Торговую точку</DropdownMenuItem>
            <DropdownMenuItem>Смену</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="secondary"
          size="icon"
          aria-label="Настройки"
          className="hidden sm:inline-flex"
        >
          <Settings />
        </Button>

        <Button
          variant="secondary"
          size="icon"
          aria-label="Уведомления"
          className="relative hidden sm:inline-flex"
        >
          <Bell />
          <span className="absolute top-1.5 right-1.5 size-2 rounded-full border-2 border-secondary bg-destructive" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              className="h-9 gap-2 px-1.5 sm:pr-3"
            >
              <Avatar className="size-7 rounded-md">
                <AvatarImage
                  src="/svg/default-avatar.svg"
                  alt="Павел Карташев"
                />
                <AvatarFallback className="rounded-md">ПК</AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-semibold md:inline">
                Павел Карташев
              </span>
              <ChevronDown className="hidden text-muted-foreground sm:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Профиль</DropdownMenuItem>
            <DropdownMenuItem>Настройки</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Выйти</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
