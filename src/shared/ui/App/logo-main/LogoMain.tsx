import { cn } from '@shared/libs'

interface LogoMainProps {
  showOnlyLogo?: boolean
  className?: string
}
export function LogoMain({ showOnlyLogo, className }: LogoMainProps) {
  return (
    <div className={cn('flex items-center gap-3 px-4 py-3 w-full', className)}>
      <img
        src="/logos/logo.svg"
        alt="Logo"
      />
      {!showOnlyLogo && (
        <img
          src="/logos/logo-name.svg"
          alt="Logo Name"
        />
      )}
    </div>
  )
}
