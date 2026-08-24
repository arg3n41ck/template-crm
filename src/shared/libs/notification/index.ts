import { toast } from 'sonner'

interface NotificationConfig {
  message: string
  description?: string
  duration?: number
}

const options = ({ description, duration }: NotificationConfig) => ({
  description,
  duration,
})

export const notification = {
  error(config: NotificationConfig) {
    toast.error(config.message, options(config))
  },
  success(config: NotificationConfig) {
    toast.success(config.message, options(config))
  },
  warning(config: NotificationConfig) {
    toast.warning(config.message, options(config))
  },
  info(config: NotificationConfig) {
    toast.info(config.message, options(config))
  },
}
