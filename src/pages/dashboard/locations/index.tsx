import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/locations/')({
  component: LocationsPage,
})

function LocationsPage() {
  return <div>Торговые точки</div>
}
