import { clearAdminSession } from '../../utils/auth'
import { clearCsrfToken } from '../../utils/csrf'

export default defineEventHandler((event) => {
  clearAdminSession(event)
  clearCsrfToken(event)
  return { ok: true }
})
