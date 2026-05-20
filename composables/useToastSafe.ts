import { useToast } from 'primevue/usetoast'

type ToastApi = ReturnType<typeof useToast>

export function useToastSafe(): ToastApi | null {
  if (!import.meta.client) return null
  try {
    return useToast()
  } catch {
    return null
  }
}
