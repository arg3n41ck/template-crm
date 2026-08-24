import 'i18next'

import { resources } from '@shared/config'

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false
    defaultNS: 'about'
    resources: (typeof resources)['ru']
  }
}
