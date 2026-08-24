import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/management/')({
  component: ManagementPage,
})

function ManagementPage() {
  return <div>Управление</div>
}
