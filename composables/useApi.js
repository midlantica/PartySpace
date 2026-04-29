/**
 * Base API composable - wraps $fetch with the configured base URL
 */
export const useApi = () => {
  const config = useRuntimeConfig()
  const base = config.public.apiBase

  const get = (path) => $fetch(`${base}${path}`)
  const post = (path, body) => $fetch(`${base}${path}`, { method: 'POST', body })
  const put = (path, body) => $fetch(`${base}${path}`, { method: 'PUT', body })
  const del = (path) => $fetch(`${base}${path}`, { method: 'DELETE' })

  return { get, post, put, del }
}
