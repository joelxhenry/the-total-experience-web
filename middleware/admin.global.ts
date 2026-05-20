export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith('/admin')) return
  if (to.path === '/admin/login') return

  const { data } = await useFetch<{ authenticated: boolean }>('/api/admin/session', {
    key: `admin-session:${to.fullPath}`,
    headers: import.meta.server ? useRequestHeaders(['cookie']) : undefined
  })

  if (!data.value?.authenticated) {
    return navigateTo('/admin/login')
  }
})
