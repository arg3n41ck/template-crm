import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/support/')({
  component: SupportPage,
})

function SupportPage() {
  return <div>Служба поддержки</div>
}
