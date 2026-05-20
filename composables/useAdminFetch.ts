// Wrap $fetch for admin endpoints so mutating requests automatically carry the
// CSRF header read from the non-HttpOnly `csrf_token` cookie set by the server.
function readCsrfCookie(): string | null {
  if (!import.meta.client) return null
  const match = document.cookie.match(/(?:^|;\s*)csrf_token=([^;]+)/)
  return match ? decodeURIComponent(match[1]!) : null
}

type FetchOptions = Parameters<typeof $fetch>[1] & { headers?: Record<string, string> }

export function useAdminFetch() {
  return <T = unknown>(url: string, opts: FetchOptions = {}) => {
    const method = (opts.method ?? 'GET').toString().toUpperCase()
    const headers: Record<string, string> = { ...(opts.headers ?? {}) }
    if (method !== 'GET' && method !== 'HEAD') {
      const token = readCsrfCookie()
      if (token) headers['x-csrf-token'] = token
    }
    return $fetch<T>(url, { ...opts, headers })
  }
}
