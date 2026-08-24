export const userRole = {
  operator: {
    key: 'operator',
    label: 'Оператор',
  },
  editor: {
    key: 'editor',
    label: 'Редактор',
  },
}

export type UserRoleTypes = keyof typeof userRole
