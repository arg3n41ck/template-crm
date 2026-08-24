import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/tracking/')({
  component: TrackingPage,
})

function TrackingPage() {
  return <div>Отслеживание</div>
}
