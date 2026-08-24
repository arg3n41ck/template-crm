import { ReactNode } from 'react'

import { cn } from '@shared/libs'
import { Label } from '@shared/ui/shadcn'

interface FieldWrapperProps {
  label?: string
  error?: string
  className?: string
  children: ReactNode
}

const FieldWrapper = ({
  children,
  label,
  className,
  error,
}: FieldWrapperProps) => (
  <div className={cn('space-y-2', className)}>
    {label && <Label>{label}</Label>}
    {children}
    {error && (
      <p
        className="text-xs text-destructive"
        role="alert"
      >
        {error}
      </p>
    )}
  </div>
)

export default FieldWrapper
