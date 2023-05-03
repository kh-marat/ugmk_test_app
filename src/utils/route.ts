import { compile } from 'path-to-regexp/dist'

export const getRoute = (route = '', pathParams = {}, queryParams: Record<string, unknown> = {}) => {
  const compileResult = compile(route)(pathParams)
  const query = Object.keys(queryParams)
    .map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(String(queryParams[key]))
    })
    .join('&')

  return query ? `${compileResult}?${query}` : compileResult
}
