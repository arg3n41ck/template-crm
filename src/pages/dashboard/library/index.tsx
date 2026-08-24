import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/library/')({
  component: LibraryPage,
})

function LibraryPage() {
  return <div>Библиотека</div>
}
