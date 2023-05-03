export const getFactoryIdByKey = (key: string) => {
  if (!key) {
    return null
  }

  const id = key.match(/\d+/)?.[0]

  if (!id) {
    return null
  }

  return parseInt(id, 10)
}

export const getFactoryNameByKey = (key: string | undefined, prefix: string = ''): string => {
  if (!key) {
    return 'Unknown'
  }

  const id = getFactoryIdByKey(key)

  if (!id) {
    return 'Unknown'
  }

  // TODO: update when needed
  if (id > 33) {
    return 'Unknown'
  }

  return `${prefix} ${String.fromCharCode(id + 1039)}`
}
