import { isAdminAuthenticated } from '../../utils/auth'
import { issueCsrfToken } from '../../utils/csrf'

export default defineEventHandler((event) => {
  const authenticated = isAdminAuthenticated(event)
  if (!authenticated) return { authenticated: false }
  // Re-issue (or refresh) the CSRF token so the client always has a valid one
  // matching the cookie even after a page reload.
  const csrf = issueCsrfToken(event)
  return { authenticated: true, csrf }
})
