export const thousandSeparatorRegex = /\B(?=(\d{3})+(?!\d))/g

export function displaySum(
  value: number | string | null | undefined,
  placeholder: string = '0.00 KGS',
) {
  if (value === null || value === undefined) return placeholder

  const numericValue = typeof value === 'string' ? Number(value) : value
  if (Number.isFinite(numericValue)) {
    return `${new Intl.NumberFormat('ru-RU', {
      maximumFractionDigits: 2,
    }).format(numericValue)} KGS`
  }

  return `${String(value).replace(thousandSeparatorRegex, ' ')} KGS`
}
