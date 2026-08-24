import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/statistics/')({
  component: StatisticsPage,
})

function StatisticsPage() {
  return <div>Статистика</div>
}
