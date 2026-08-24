import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/shifts/')({
  component: ShiftsPage,
})

function ShiftsPage() {
  return <div>Смены</div>
}
