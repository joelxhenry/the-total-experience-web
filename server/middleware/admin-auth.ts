import { requireAdmin } from '../utils/auth'

const PUBLIC_ADMIN_ROUTES = new Set<string>([
  '/api/admin/login',
  '/api/admin/logout',
  '/api/admin/session'
])

export default defineEventHandler((event) => {
  const url = event.path?.split('?')[0] ?? ''
  if (!url.startsWith('/api/admin/')) return
  if (PUBLIC_ADMIN_ROUTES.has(url)) return
  requireAdmin(event)
})
