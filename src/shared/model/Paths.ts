const paths = {
  template: {
    login: 'login',
    users: {
      me: 'me',
    },
  },
} as const

type FlattenApiPaths<T> = ExtractKeys<T, ''>

type ExtractKeys<T, P extends string> = {
  [K in keyof T & string]: T[K] extends Record<string, unknown>
    ?
        | `${P}${P extends '' ? '' : '_'}${K}`
        | ExtractKeys<T[K], `${P}${P extends '' ? '' : '_'}${K}`>
    : `${P}${P extends '' ? '' : '_'}${K}`
}[keyof T & string]

function flattenApiPaths<T extends Record<string, unknown>>(
  obj: T,
): Record<FlattenApiPaths<T>, string> {
  const result = {} as Record<string, string>

  function traverse(
    subObj: Record<string, unknown>,
    parentPath = '',
    parentKey = '',
  ) {
    for (const [key, value] of Object.entries(subObj)) {
      const newKey = parentKey ? `${parentKey}_${key}` : key
      const newPath = `${parentPath}${key}/`

      result[newKey] = newPath

      if (typeof value === 'object' && value !== null) {
        traverse(value as Record<string, unknown>, newPath, newKey)
      }
    }
  }

  traverse(obj)
  return result as Record<FlattenApiPaths<T>, string>
}

export const ApiPaths = flattenApiPaths(paths)

/*
{
  template: "/template/",
  template_login: "/template/login/",
  template_login_users_me: "/template/login/users/me/"
}
*/
