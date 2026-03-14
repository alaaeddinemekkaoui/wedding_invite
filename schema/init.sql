-- RSVP table schema for PostgreSQL (Neon Postgres compatible)
-- Run this once to initialise the database.

CREATE TABLE IF NOT EXISTS rsvp (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(200)  NOT NULL,
  phone       VARCHAR(30)   NOT NULL,
  guest_count INTEGER       NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_rsvp_created_at ON rsvp (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_rsvp_name ON rsvp (name);
