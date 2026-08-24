import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/statistics-1/')({
  component: Statistics1Page,
})

function Statistics1Page() {
  return <div>Статистика — Label 1</div>
}
