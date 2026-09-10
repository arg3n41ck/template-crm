import { useLocation, useNavigate } from '@tanstack/react-router'
import { ChevronDown, Circle, MoreVertical, Plus } from 'lucide-react'

import { ReactNode, useMemo, useState } from 'react'

import { SideMenuItem, helpMenu, mainMenu, secondMenu } from '@modules/common'

import { ROUTES } from '@shared/config'
import { cn } from '@shared/libs'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  LogoMain,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from '@shared/ui'

export interface SiderProps {
  children?: ReactNode
  className?: string
}

interface MenuSectionProps {
  title: string
  items: SideMenuItem[]
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  renderMenu: (items: SideMenuItem[], allowChildren?: boolean) => ReactNode
  allowChildren?: boolean
  showAdd?: boolean
  collapsed: boolean
}

function MenuSection({
  title,
  items,
  isOpen,
  onOpenChange,
  renderMenu,
  allowChildren,
  showAdd,
  collapsed,
}: MenuSectionProps) {
  return (
    <Collapsible
      open={collapsed || isOpen}
      onOpenChange={onOpenChange}
    >
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger className="cursor-pointer gap-2">
            <ChevronDown
              className={cn('transition-transform', !isOpen && '-rotate-90')}
            />
            <span>{title}</span>
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        {showAdd && (
          <SidebarGroupAction aria-label={`Добавить в раздел ${title}`}>
            <Plus />
          </SidebarGroupAction>
        )}
        <CollapsibleContent asChild>
          <SidebarGroupContent>
            <SidebarMenu>{renderMenu(items, allowChildren)}</SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  )
}

export function SiderDashboard(props: SiderProps) {
  const navigate = useNavigate()
  const { state, isMobile, setOpenMobile } = useSidebar()
  const [mainMenuOpen, setMainMenuOpen] = useState(true)
  const [secondMenuOpen, setSecondMenuOpen] = useState(true)
  const [helpMenuOpen, setHelpMenuOpen] = useState(true)
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {},
  )
  const { pathname } = useLocation()
  const rootPath = useMemo(() => pathname.split('/')?.[2], [pathname])
  const collapsed = state === 'collapsed' && !isMobile

  const isChildActive = (item: SideMenuItem) =>
    Boolean(item.children?.some((child) => rootPath === child.key))

  const handleMenuClick = (key: string, parentKey?: string) => {
    if (!parentKey) setExpandedItems({})
    const route = ROUTES.dashboard[key as keyof typeof ROUTES.dashboard]
    navigate({ to: route ?? `/dashboard/${key}` })
    setOpenMobile(false)
  }

  const renderMenu = (items: SideMenuItem[], allowChildren = false) =>
    items.map((item) => {
      const hasChildren = Boolean(item.children?.length)
      const isOpen = Boolean(expandedItems[item.key])
      const isActive = rootPath === item.key || isChildActive(item)

      if (allowChildren && hasChildren && !collapsed) {
        return (
          <Collapsible
            key={item.key}
            asChild
            open={isOpen}
            onOpenChange={(open) =>
              setExpandedItems(open ? { [item.key]: true } : {})
            }
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  isActive={isActive}
                  tooltip={item.label}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  <ChevronDown
                    className={cn(
                      'ml-auto transition-transform',
                      !isOpen && '-rotate-90',
                    )}
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.children?.map((child) => (
                    <SidebarMenuSubItem key={child.key}>
                      <SidebarMenuSubButton
                        asChild
                        isActive={rootPath === child.key}
                      >
                        <button
                          type="button"
                          onClick={() => handleMenuClick(child.key, item.key)}
                        >
                          <Circle className="size-2 fill-current" />
                          <span>{child.label}</span>
                        </button>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        )
      }

      return (
        <SidebarMenuItem key={item.key}>
          <SidebarMenuButton
            type="button"
            isActive={isActive}
            tooltip={item.label}
            onClick={() => handleMenuClick(item.key)}
          >
            {item.icon}
            <span>{item.label}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      )
    })

  return (
    <Sidebar
      collapsible="icon"
      className={props.className}
      aria-label="Основная навигация"
    >
      <SidebarHeader className="justify-center border-b border-sidebar-border p-0">
        <LogoMain
          showOnlyLogo={collapsed}
          className={cn('min-h-16', collapsed && 'justify-center px-0')}
        />
      </SidebarHeader>

      <SidebarContent>
        <nav aria-label="Разделы панели управления">
          <MenuSection
            title="ОСНОВНОЕ"
            items={mainMenu}
            isOpen={mainMenuOpen}
            onOpenChange={setMainMenuOpen}
            renderMenu={renderMenu}
            allowChildren
            showAdd
            collapsed={collapsed}
          />
          <SidebarSeparator />
          <MenuSection
            title="УПРАВЛЕНИЕ"
            items={secondMenu}
            isOpen={secondMenuOpen}
            onOpenChange={setSecondMenuOpen}
            renderMenu={renderMenu}
            collapsed={collapsed}
          />
          <SidebarSeparator />
          <MenuSection
            title="ПОМОЩЬ"
            items={helpMenu}
            isOpen={helpMenuOpen}
            onOpenChange={setHelpMenuOpen}
            renderMenu={renderMenu}
            collapsed={collapsed}
          />
        </nav>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  tooltip="Меню пользователя"
                >
                  <Avatar className="size-8 rounded-lg">
                    <AvatarImage
                      src="/svg/default-avatar.svg"
                      alt="Алексей"
                    />
                    <AvatarFallback className="rounded-lg">А</AvatarFallback>
                  </Avatar>
                  <span className="grid min-w-0 flex-1 text-left leading-tight">
                    <span className="truncate text-sm font-medium">
                      Алексей
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      subtext
                    </span>
                  </span>
                  <MoreVertical className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="right"
                align="end"
                className="min-w-56"
              >
                <DropdownMenuItem>Профиль</DropdownMenuItem>
                <DropdownMenuItem>Настройки</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">Выйти</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
