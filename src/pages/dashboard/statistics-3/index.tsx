import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/statistics-3/')({
  component: Statistics3Page,
})

function Statistics3Page() {
  return <div>Статистика — Label 3</div>
}
