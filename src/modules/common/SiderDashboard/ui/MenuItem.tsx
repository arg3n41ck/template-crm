import { ChevronRight } from 'lucide-react'

import { SideMenuItem } from '@modules/common'

import { cn } from '@shared/libs'
import { Button, Tooltip, TooltipContent, TooltipTrigger } from '@shared/ui'

export function MenuItem({
  item,
  isSelected,
  collapsed,
  isExpanded,
  onClick,
  onToggleExpand,
}: {
  item: SideMenuItem
  isSelected: boolean
  collapsed: boolean
  isExpanded?: boolean
  onClick: () => void
  onToggleExpand?: () => void
  onChildClick?: (key: string) => void
}) {
  const hasChildren = Boolean(item.children?.length)

  const handleClick = () => {
    if (hasChildren && !collapsed) {
      onToggleExpand?.()
      return
    }
    onClick()
  }

  const button = (
    <Button
      type="button"
      variant="ghost"
      className={cn(
        'h-10 w-full justify-start px-3 text-sidebar-foreground',
        isSelected
          ? 'bg-sidebar-accent text-sidebar-accent-foreground'
          : 'hover:bg-sidebar-accent/70',
        collapsed && 'justify-center px-0',
      )}
      onClick={handleClick}
      aria-current={isSelected ? 'page' : undefined}
      aria-expanded={hasChildren && !collapsed ? isExpanded : undefined}
      aria-label={collapsed ? item.label : undefined}
    >
      <span className="flex size-5 shrink-0 items-center justify-center">
        {item.icon}
      </span>
      {!collapsed && <span className="flex-1 text-left">{item.label}</span>}
      {!collapsed && hasChildren && (
        <ChevronRight
          className={cn(
            'size-4 transition-transform',
            isExpanded && 'rotate-90',
          )}
        />
      )}
    </Button>
  )

  if (!collapsed) return button

  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent side="right">{item.label}</TooltipContent>
    </Tooltip>
  )
}
