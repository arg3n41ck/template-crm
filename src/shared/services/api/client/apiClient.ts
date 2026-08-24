import axios, { AxiosError, AxiosInstance } from 'axios'

import { BaseApiDomain } from '@shared/config'
import { notification } from '@shared/libs'

const apiClient: AxiosInstance = axios.create({
  baseURL: BaseApiDomain,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const errorMessage = error.response?.data?.message || 'Произошла ошибка.'
    const status = error.response?.status

    switch (status) {
      case 400:
        notification.error({
          message: 'Ошибка 400',
          description: `Некорректный запрос. ${errorMessage}`,
        })
        break
      case 401:
        notification.error({
          message: 'Ошибка 401',
          description: `Неавторизованный доступ. Пожалуйста, войдите в систему. ${errorMessage}`,
        })
        break
      case 403:
        notification.error({
          message: 'Ошибка 403',
          description: `Доступ запрещен. ${errorMessage}`,
        })
        break
      case 404:
        notification.error({
          message: 'Ошибка 404',
          description: `Ресурс не найден. ${errorMessage}`,
        })
        break
      case 500:
        notification.error({
          message: 'Ошибка 500',
          description: `Внутренняя ошибка сервера. ${errorMessage}`,
        })
        break
      default:
        notification.error({
          message: 'Неизвестная ошибка',
          description: `Произошла ошибка: ${status || 'Неизвестный статус'}. ${errorMessage}`,
        })
    }

    return Promise.reject(error)
  },
)

export { apiClient }
