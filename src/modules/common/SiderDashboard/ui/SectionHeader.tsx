import { ChevronDown, ChevronUp, Plus } from 'lucide-react'

import { Button } from '@shared/ui'

export function SectionHeader({
  title,
  collapsed,
  showChevron,
  showPlus,
  isOpen,
  onToggle,
}: {
  title: string
  collapsed: boolean
  showChevron?: boolean
  showPlus?: boolean
  isOpen?: boolean
  onToggle?: () => void
}) {
  if (collapsed) {
    if (!showChevron) return null
    return (
      <div className="flex items-center justify-center py-2">
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          onClick={onToggle}
          aria-label={isOpen ? `Скрыть ${title}` : `Показать ${title}`}
        >
          {isOpen ? <ChevronDown /> : <ChevronUp />}
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 px-2 py-2">
      {showChevron && (
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          onClick={onToggle}
          aria-label={isOpen ? `Скрыть ${title}` : `Показать ${title}`}
        >
          {isOpen ? <ChevronDown /> : <ChevronUp />}
        </Button>
      )}
      <span className="flex-1 text-xs font-medium text-muted-foreground">
        {title}
      </span>
      {showPlus && (
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          aria-label={`Добавить в раздел ${title}`}
        >
          <Plus />
        </Button>
      )}
    </div>
  )
}
