import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/history/')({
  component: HistoryPage,
})

function HistoryPage() {
  return <div>История</div>
}
