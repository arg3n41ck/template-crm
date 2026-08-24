import { Circle } from 'lucide-react'

import { cn } from '@shared/libs'
import { Button } from '@shared/ui'

export function SubMenuItem({
  label,
  isSelected,
  onClick,
}: {
  label: string
  isSelected: boolean
  onClick: () => void
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      className={cn(
        'h-9 w-full justify-start px-3 font-normal',
        isSelected && 'bg-sidebar-accent',
      )}
      onClick={onClick}
      aria-current={isSelected ? 'page' : undefined}
    >
      <Circle className="size-2 fill-current" />
      <span className="flex-1 text-left">{label}</span>
    </Button>
  )
}
