import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { Sidebar, SidebarContent, SidebarTrigger } from '@shared/ui/shadcn'

import { DashboardLayout } from './index'

beforeEach(() => {
  Object.defineProperty(window, 'innerWidth', {
    configurable: true,
    value: 1024,
  })
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  })
})

function renderLayout() {
  return render(
    <DashboardLayout
      components={{
        sider: (
          <Sidebar collapsible="icon">
            <SidebarContent>Навигация</SidebarContent>
          </Sidebar>
        ),
        header: <SidebarTrigger aria-label="Переключить боковую панель" />,
        body: <p>Содержимое</p>,
      }}
    />,
  )
}

describe('DashboardLayout', () => {
  it('toggles the shadcn sidebar from the visible trigger', async () => {
    const user = userEvent.setup()
    const { container } = renderLayout()
    const sidebar = container.querySelector('[data-slot="sidebar"][data-state]')

    expect(sidebar).toHaveAttribute('data-state', 'expanded')

    await user.click(
      screen.getByRole('button', {
        name: 'Переключить боковую панель',
      }),
    )

    expect(sidebar).toHaveAttribute('data-state', 'collapsed')
  })

  it('supports the documented Ctrl+B keyboard shortcut', () => {
    const { container } = renderLayout()
    const sidebar = container.querySelector('[data-slot="sidebar"][data-state]')

    fireEvent.keyDown(window, { key: 'b', ctrlKey: true })

    expect(sidebar).toHaveAttribute('data-state', 'collapsed')
  })
})
