import { memo } from 'react'

import { ErrorResponse } from '@shared/types'
import { Alert, AlertDescription, AlertTitle, Button } from '@shared/ui/shadcn'

interface ErrorProps {
  error: ErrorResponse
  onRefetch?: () => void
}

const ErrorInfo = ({ error, onRefetch }: ErrorProps) => (
  <div className="space-y-4">
    <Alert variant="destructive">
      <AlertTitle>{error?.message || 'Произошла ошибка'}</AlertTitle>
      <AlertDescription>
        {error?.response?.data?.message || error?.response?.statusText}
      </AlertDescription>
    </Alert>

    {onRefetch && <Button onClick={onRefetch}>Обновить</Button>}
  </div>
)

export default memo(ErrorInfo)
