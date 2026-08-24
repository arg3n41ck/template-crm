import { PropsWithChildren } from 'react'

import { cn } from '@shared/libs'

import './AppearanceAnimation.css'

interface AppearanceAnimationProps {
  duration?: number
  animationVariant?: AnimationType
  isAnimated?: boolean
}

type AnimationType = 'bottom' | 'appearance' | 'slide'

export function AppearanceAnimation({
  children,
  duration = 0.5,
  animationVariant = 'appearance',
  isAnimated = true,
}: PropsWithChildren<AppearanceAnimationProps>) {
  return (
    <div
      style={{
        transition: `all ${duration}s ease-in-out`,
        animationDuration: `${duration}s`,
      }}
      className={cn('animation_container', isAnimated && animationVariant)}
    >
      {children}
    </div>
  )
}
