import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/statistics-5/')({
  component: Statistics5Page,
})

function Statistics5Page() {
  return <div>Статистика — Label 5</div>
}
