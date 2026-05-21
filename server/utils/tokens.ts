import { randomBytes, createHash } from 'node:crypto'
import { useDb } from '../db'

const TOKEN_TTL_DAYS = 14

export interface InviteRow {
  id: string
  email: string
  customer_name: string | null
  token_hash: string
  created_at: number
  expires_at: number
  used_at: number | null
}

export function generateToken(): string {
  return randomBytes(32).toString('base64url')
}

export function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex')
}

export function tokenTtlMs(): number {
  return TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000
}

export type TokenLookup =
  | { ok: true; invite: InviteRow }
  | { ok: false; reason: 'not_found' | 'expired' | 'used' }

export async function lookupInviteByToken(token: string): Promise<TokenLookup> {
  const db = useDb()
  const { data, error } = await db
    .from('invites')
    .select('*')
    .eq('token_hash', hashToken(token))
    .maybeSingle<InviteRow>()

  if (error) {
    console.error('[tokens.lookupInviteByToken] query failed', error)
    return { ok: false, reason: 'not_found' }
  }
  if (!data) return { ok: false, reason: 'not_found' }
  if (data.used_at !== null) return { ok: false, reason: 'used' }
  if (data.expires_at < Date.now()) return { ok: false, reason: 'expired' }
  return { ok: true, invite: data }
}
