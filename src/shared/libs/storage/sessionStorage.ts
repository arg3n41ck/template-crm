import { appLocaleStorageKey } from '@shared/model'

import { SetStorageProps } from './types'

export const setSessionStorage = ({
  key = appLocaleStorageKey,
  value,
}: SetStorageProps) => {
  sessionStorage.setItem(key, value)
}

export const getSessionStorage = (key = appLocaleStorageKey) => {
  return sessionStorage.getItem(key) || ''
}

export const deleteSessionStorage = (key = appLocaleStorageKey) => {
  sessionStorage.removeItem(key)
}
