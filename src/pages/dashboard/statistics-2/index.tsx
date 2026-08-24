import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/statistics-2/')({
  component: Statistics2Page,
})

function Statistics2Page() {
  return <div>Статистика — Label 2</div>
}
