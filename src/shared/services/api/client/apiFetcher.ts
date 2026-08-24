import axios, { type AxiosRequestConfig } from 'axios'

import type { ApiContext } from '../apiContext'

import { apiClient } from './apiClient'

export type ErrorWrapper<TError> =
  | TError
  | { status: 'unknown'; payload: string }

export type ApiFetcherOptions<TBody, THeaders, TQueryParams, TPathParams> = {
  url: string
  method: string
  body?: TBody
  headers?: THeaders
  queryParams?: TQueryParams
  pathParams?: TPathParams
  signal?: AbortSignal
} & ApiContext['fetcherOptions']

export const apiFetch = async <
  TData,
  TError,
  TBody,
  THeaders,
  TQueryParams,
  TPathParams,
>({
  url,
  method,
  body,
  headers,
  pathParams,
  queryParams,
  signal,
}: ApiFetcherOptions<
  TBody,
  THeaders,
  TQueryParams,
  TPathParams
>): Promise<TData> => {
  try {
    const normalizedHeaders = buildHeaders(
      headers as Record<string, unknown>,
      body,
    )

    const config: AxiosRequestConfig = {
      url: resolveUrl(url, pathParams as Record<string, unknown>),
      method: method.toLowerCase(),
      data: body === undefined ? undefined : body,
      headers: normalizedHeaders,
      params: queryParams,
      signal,
    }

    const response = await apiClient.request(config)
    return response.data as TData
  } catch (error) {
    throw normalizeError<TError>(error)
  }
}

const buildHeaders = (
  headers: Record<string, unknown> | undefined,
  body?: unknown,
): Record<string, string> => {
  const normalized: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(headers as Record<string, string>),
  }

  if (body instanceof FormData) {
    delete normalized['Content-Type']
  }

  return normalized
}

const resolveUrl = (
  url: string,
  pathParams: Record<string, unknown> | undefined = {},
): string => {
  const params = pathParams ?? {}
  return url.replace(/\{(\w+)\}/g, (_, key) => `${params[key] ?? ''}`)
}

const normalizeError = <TError>(error: unknown): ErrorWrapper<TError> => {
  if (axios.isAxiosError(error)) {
    const { status, data } = error.response ?? {}

    if (data !== undefined) {
      const enrichedData =
        data && typeof data === 'object' && status
          ? { ...(data as Record<string, unknown>), status }
          : data

      return enrichedData as ErrorWrapper<TError>
    }

    if (error.code === axios.AxiosError.ERR_CANCELED) {
      return {
        status: 'unknown',
        payload: 'Request canceled',
      }
    }
  }

  return {
    status: 'unknown',
    payload:
      error instanceof Error
        ? error.message
        : typeof error === 'string'
          ? error
          : 'Unexpected error',
  }
}
