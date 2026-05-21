-- Postgres schema for Supabase. Run once in the Supabase SQL editor.
-- Timestamps are epoch milliseconds (bigint) to match the existing API shape.

create table if not exists invites (
  id text primary key,
  email text not null,
  customer_name text,
  token_hash text not null unique,
  created_at bigint not null,
  expires_at bigint not null,
  used_at bigint
);

create index if not exists idx_invites_token_hash on invites(token_hash);

create table if not exists reviews (
  id text primary key,
  invite_id text not null references invites(id) on delete cascade,
  name text not null,
  rating integer not null check (rating between 1 and 5),
  comment text not null,
  created_at bigint not null,
  is_published boolean not null default false,
  published_at bigint
);

create index if not exists idx_reviews_is_published on reviews(is_published);

-- The server uses the service role key and bypasses RLS, but enable RLS with
-- no policies so anon/auth keys can't reach these tables directly.
alter table invites enable row level security;
alter table reviews enable row level security;
