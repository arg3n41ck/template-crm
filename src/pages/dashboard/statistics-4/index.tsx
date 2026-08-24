import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/statistics-4/')({
  component: Statistics4Page,
})

function Statistics4Page() {
  return <div>Статистика — Label 4</div>
}
