import { useLocation, useNavigate } from '@tanstack/react-router'
import { MoreVertical, PanelLeftClose, PanelLeftOpen } from 'lucide-react'

import { ReactNode, useMemo, useState } from 'react'

import { SideMenuItem, helpMenu, mainMenu, secondMenu } from '@modules/common'

import { ROUTES } from '@shared/config'
import { cn } from '@shared/libs'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  LogoMain,
  Separator,
} from '@shared/ui'

import { MenuItem } from './MenuItem'
import { SectionHeader } from './SectionHeader'
import './Sider.css'
import { SubMenuItem } from './SubMenuItem'

export interface SiderProps {
  children?: ReactNode
  className?: string
}

export function SiderDashboard(props: SiderProps) {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const [mainMenuOpen, setMainMenuOpen] = useState(true)
  const [secondMenuOpen, setSecondMenuOpen] = useState(true)
  const [helpMenuOpen, setHelpMenuOpen] = useState(true)
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {},
  )
  const { pathname } = useLocation()
  const rootPath = useMemo(() => pathname.split('/')?.[2], [pathname])

  const isChildActive = (item: SideMenuItem) =>
    Boolean(item.children?.some((child) => rootPath === child.key))

  const handleMenuClick = (key: string, parentKey?: string) => {
    if (!parentKey) setExpandedItems({})
    const route = ROUTES.dashboard[key as keyof typeof ROUTES.dashboard]
    navigate({ to: route ?? `/dashboard/${key}` })
  }

  const toggleExpand = (key: string) => {
    setExpandedItems((previous) => (previous[key] ? {} : { [key]: true }))
  }

  const renderMenu = (items: SideMenuItem[], allowChildren = false) =>
    items.map((item) => {
      const hasChildren = Boolean(item.children?.length)
      const isOpen = Boolean(expandedItems[item.key])
      const isActive = rootPath === item.key || isChildActive(item)

      return (
        <div
          key={item.key}
          className={cn(
            'rounded-lg',
            !collapsed && allowChildren && hasChildren && isOpen && 'bg-card',
          )}
        >
          <MenuItem
            item={item}
            isSelected={isActive}
            collapsed={collapsed}
            isExpanded={isOpen}
            onClick={() => handleMenuClick(item.key)}
            onToggleExpand={() => toggleExpand(item.key)}
          />
          {!collapsed && allowChildren && hasChildren && (
            <div
              className={cn(
                'grid transition-[grid-template-rows] duration-200 ease-in-out',
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
            >
              <div className="overflow-hidden">
                <div className="flex flex-col px-2 pb-2">
                  {item.children?.map((child) => (
                    <SubMenuItem
                      key={child.key}
                      label={child.label}
                      isSelected={rootPath === child.key}
                      onClick={() => handleMenuClick(child.key, item.key)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )
    })

  return (
    <aside
      className={cn(
        'navWrapper flex h-full shrink-0 flex-col border-r bg-sidebar text-sidebar-foreground transition-[width] duration-300',
        collapsed ? 'w-17' : 'w-[280px]',
        props.className,
      )}
    >
      <div className="flex items-center border-b border-sidebar-border">
        {!collapsed && (
          <div className="min-w-0 flex-1">
            <LogoMain />
          </div>
        )}
        <div
          className={cn(
            'flex items-center',
            collapsed ? 'w-full justify-center px-3 py-3' : 'pr-3',
          )}
        >
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed((value) => !value)}
            aria-label={collapsed ? 'Развернуть меню' : 'Свернуть меню'}
          >
            {collapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
          </Button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
        <nav
          className="flex flex-1 flex-col"
          aria-label="Основная навигация"
        >
          <div className="px-3 py-2">
            <SectionHeader
              title="ОСНОВНОЕ"
              collapsed={collapsed}
              showChevron
              showPlus
              isOpen={mainMenuOpen}
              onToggle={() => setMainMenuOpen((value) => !value)}
            />
            {mainMenuOpen && (
              <div className="flex flex-col">{renderMenu(mainMenu, true)}</div>
            )}
          </div>

          <Separator />

          <div className="px-3 py-2">
            <SectionHeader
              title="УПРАВЛЕНИЕ"
              collapsed={collapsed}
              showChevron
              isOpen={secondMenuOpen}
              onToggle={() => setSecondMenuOpen((value) => !value)}
            />
            {secondMenuOpen && (
              <div className="flex flex-col">{renderMenu(secondMenu)}</div>
            )}
          </div>

          <div className="flex-1" />
          <Separator />

          <div className="px-3 py-2">
            <SectionHeader
              title="ПОМОЩЬ"
              collapsed={collapsed}
              showChevron
              isOpen={helpMenuOpen}
              onToggle={() => setHelpMenuOpen((value) => !value)}
            />
            {helpMenuOpen && (
              <div className="flex flex-col">{renderMenu(helpMenu)}</div>
            )}
          </div>
        </nav>

        <div
          className={cn(
            'm-3 flex items-center rounded-lg bg-sidebar-accent',
            collapsed ? 'justify-center p-2' : 'gap-3 p-2',
          )}
        >
          <Avatar className="size-9">
            <AvatarImage
              src="/svg/default-avatar.svg"
              alt="Алексей"
            />
            <AvatarFallback>А</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs text-muted-foreground">
                  subtext
                </p>
                <p className="truncate text-sm font-medium">Алексей</p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label="Меню пользователя"
              >
                <MoreVertical />
              </Button>
            </>
          )}
        </div>
      </div>
    </aside>
  )
}
