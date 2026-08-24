import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/employees/')({
  component: EmployeesPage,
})

function EmployeesPage() {
  return <div>Сотрудники</div>
}
