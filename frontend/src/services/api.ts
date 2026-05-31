const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001'

type RequestOptions = RequestInit & {
  token?: string | null
}

export const apiRequest = async <T>(path: string, options: RequestOptions = {}) => {
  const headers = new Headers(options.headers)

  if (!headers.has('Content-Type') && options.body && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json')
  }

  if (options.token) {
    headers.set('Authorization', `Bearer ${options.token}`)
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(data?.message || 'Request failed')
  }

  return data as T
}
