import { LoaderCircle } from 'lucide-react'

export function ContentLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <LoaderCircle
        className="size-8 animate-spin text-muted-foreground"
        aria-label="Загрузка"
      />
    </div>
  )
}
