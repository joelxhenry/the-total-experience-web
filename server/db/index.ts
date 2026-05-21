import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let _client: SupabaseClient | null = null

export function useDb(): SupabaseClient {
  if (_client) return _client

  const cfg = useRuntimeConfig()
  const url = cfg.supabaseUrl
  const key = cfg.supabaseServiceKey
  if (!url || !key) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Supabase is not configured (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY missing)'
    })
  }

  _client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false }
  })
  return _client
}
