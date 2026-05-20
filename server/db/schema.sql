-- Reviews backend schema. Idempotent: safe to re-run on every boot.

CREATE TABLE IF NOT EXISTS invites (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  customer_name TEXT,
  token_hash TEXT NOT NULL UNIQUE,
  created_at INTEGER NOT NULL,
  expires_at INTEGER NOT NULL,
  used_at INTEGER
);

CREATE INDEX IF NOT EXISTS idx_invites_token_hash ON invites(token_hash);

CREATE TABLE IF NOT EXISTS reviews (
  id TEXT PRIMARY KEY,
  invite_id TEXT NOT NULL REFERENCES invites(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  is_published INTEGER NOT NULL DEFAULT 0,
  published_at INTEGER
);

CREATE INDEX IF NOT EXISTS idx_reviews_is_published ON reviews(is_published);
