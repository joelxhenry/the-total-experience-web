import { useDb } from '../db'

// Eagerly construct the Supabase client at boot so misconfiguration fails fast.
export default defineNitroPlugin(() => {
  try {
    useDb()
  } catch (err) {
    console.error('[db plugin] Supabase init skipped:', (err as Error).message)
  }
})
