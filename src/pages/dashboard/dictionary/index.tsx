import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/dictionary/')({
  component: DictionaryPage,
})

function DictionaryPage() {
  return <div>Словарь</div>
}
