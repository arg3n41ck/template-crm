import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/example/$exampleUuid/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/example/$exampleUuid/"!</div>
}
