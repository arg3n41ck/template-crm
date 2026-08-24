import { useLocation, useNavigate, useSearch } from '@tanstack/react-router'

import { useEffect } from 'react'

interface UseAppSearchParamsProps {
  removeKeysOnChange?: ParamKey[]
  removeKeys?: ParamKey[]
}

let removeKeysOnChangeState: ParamKey[] = []

const setRemoveKeysOnChangeState = (keys: ParamKey[]) => {
  removeKeysOnChangeState = [...removeKeysOnChangeState, ...keys]
}

const removeRemoveKeysOnChangeState = (removeKeys: ParamKey[]) => {
  const newList = removeKeysOnChangeState.filter(
    (item) => !removeKeys.includes(item),
  )

  removeKeysOnChangeState = newList
}

export const useAppSearchParams = ({
  removeKeysOnChange,
  removeKeys,
}: UseAppSearchParamsProps = {}) => {
  const { pathname } = useLocation()

  const navigate = useNavigate()

  // TanStack Router uses search object instead of URLSearchParams
  const searchObject = (useSearch({ strict: false }) || {}) as Record<
    string,
    string
  >

  const setSearchParams = (newParams: Record<string, string>) => {
    navigate({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      search: (() => newParams) as any,
    })
  }

  // Create a URLSearchParams-like interface for compatibility
  const searchParams = {
    get: (key: string) => searchObject[key] || null,
    set: (key: string, value: string) => {
      searchObject[key] = value
    },
    delete: (key: string) => {
      delete searchObject[key]
    },
    forEach: (callback: (value: string, key: string) => void) => {
      Object.entries(searchObject).forEach(([key, value]) =>
        callback(value, key),
      )
    },
  }

  const deleteParamsRemoveKeysOnChangeState = () => {
    if (!removeKeysOnChangeState.length) return

    removeKeysOnChangeState?.forEach((key) => {
      deleteParam(key as ParamKey)
    })
  }

  const setParam = (key: ParamKey, value: string) => {
    deleteParamsRemoveKeysOnChangeState()
    onRemoveKeys()

    const newParams = { ...searchObject, [key]: value }
    setSearchParams(newParams)
  }

  const setParams = (keys: { key: ParamKey; value: string }[]) => {
    const newParams = { ...searchObject }
    keys.forEach((param) => {
      newParams[param.key] = param.value
    })

    setSearchParams(newParams)
  }

  const deleteParam = (key: ParamKey) => {
    const newParams = { ...searchObject }
    delete newParams[key]
    setSearchParams(newParams)
  }

  const onRemoveKeys = () => {
    if (!removeKeys?.length) return

    deleteKeys(removeKeys)
  }

  const deleteKeys = (keys: ParamKey[]) => {
    const newParams = { ...searchObject }
    keys.forEach((key) => {
      delete newParams[key]
    })
    setSearchParams(newParams)
  }

  const getParam = (key: ParamKey) => {
    return searchParams.get(key)
  }

  const resetAllParams = () => {
    navigate({ to: pathname, search: {} })
  }

  const getAllParams = () => {
    const params: CommonQuery = {}

    searchParams.forEach((value, key: string) => {
      params[key as ParamKey] = value
    })

    return params
  }

  useEffect(() => {
    if (removeKeysOnChange?.length) {
      setRemoveKeysOnChangeState(removeKeysOnChange)
    }

    return () => {
      if (removeKeysOnChange?.length) {
        removeRemoveKeysOnChangeState(removeKeysOnChange)
      }
    }
  }, [removeKeysOnChange])

  return {
    setParam,
    deleteParam,
    getAllParams,
    resetAllParams,
    getParam,
    setParams,
  }
}
