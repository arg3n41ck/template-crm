export const getFileTypeUrl = (link: string) => {
  try {
    return link?.split('.').pop()
  } catch {
    return ''
  }
}
