import { Outlet } from '@tanstack/react-router'
import { ThemeProvider } from 'next-themes'

import { QueryProvider } from '@app/providers'

import { I18ConfigProvider, StyleProvider } from '@shared/config'
import { ErrorHoc, Toaster, TooltipProvider } from '@shared/ui'

export const GlobalLayout = () => (
  <ErrorHoc>
    <I18ConfigProvider>
      <StyleProvider>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>
              <Outlet />
              <Toaster richColors />
            </TooltipProvider>
          </ThemeProvider>
        </QueryProvider>
      </StyleProvider>
    </I18ConfigProvider>
  </ErrorHoc>
)
