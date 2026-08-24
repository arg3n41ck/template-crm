import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/downloads/')({
  component: DownloadsPage,
})

function DownloadsPage() {
  return <div>Загрузки</div>
}
