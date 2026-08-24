import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/settings/')({
  component: SettingsPage,
})

function SettingsPage() {
  return <div>Настройки</div>
}
