import { createFileRoute } from '@tanstack/react-router'

import { DashboardOverview } from '@modules/Dashboard'

export const Route = createFileRoute('/dashboard/home/')({
  component: DashboardOverview,
})
