import { UserRound } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@shared/ui/shadcn/avatar'

interface AvatarProfileProps {
  title: string
  subtitle: string
  src?: string
  size?: number
}

export function AvatarProfile({
  subtitle,
  title,
  src,
  size = 55,
}: AvatarProfileProps) {
  return (
    <div className="flex items-center gap-2">
      <Avatar style={{ width: size, height: size }}>
        <AvatarImage
          src={src}
          alt={title}
        />
        <AvatarFallback>
          <UserRound aria-hidden="true" />
        </AvatarFallback>
      </Avatar>
      <div className="flex min-w-0 flex-col gap-1">
        <p className="truncate text-sm">{title}</p>
        <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  )
}
