import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/transactions/')({
  component: TransactionsPage,
})

function TransactionsPage() {
  return <div>Транзакции</div>
}
