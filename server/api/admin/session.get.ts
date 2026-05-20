import { isAdminAuthenticated } from '../../utils/auth'

export default defineEventHandler((event) => {
  return { authenticated: isAdminAuthenticated(event) }
})
