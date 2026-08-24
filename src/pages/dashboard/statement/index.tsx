import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/statement/')({
  component: StatementPage,
})

function StatementPage() {
  return <div>Детальная выписка</div>
}
