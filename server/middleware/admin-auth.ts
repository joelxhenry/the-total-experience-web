import { requireAdmin } from '../utils/auth'
import { requireCsrf } from '../utils/csrf'

const PUBLIC_ADMIN_ROUTES = new Set<string>([
  '/api/admin/login',
  '/api/admin/session'
])

const MUTATING_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE'])

export default defineEventHandler((event) => {
  const url = event.path?.split('?')[0] ?? ''
  if (!url.startsWith('/api/admin/')) return
  if (PUBLIC_ADMIN_ROUTES.has(url)) return
  requireAdmin(event)
  if (MUTATING_METHODS.has(event.method)) {
    requireCsrf(event)
  }
})
