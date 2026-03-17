-- Migration for MailForge Campaign and Subscriber tables

CREATE TABLE "campaigns" (
  "id" TEXT PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
  "team_id" TEXT NOT NULL REFERENCES "teams" ("id") ON DELETE CASCADE,
  "name" TEXT NOT NULL,
  "subject" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'draft',
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "scheduled_at" TIMESTAMPTZ
);

CREATE TABLE "subscribers" (
  "id" TEXT PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
  "team_id" TEXT NOT NULL REFERENCES "teams" ("id") ON DELETE CASCADE,
  "email" TEXT NOT NULL,
  "name" TEXT,
  "status" TEXT NOT NULL DEFAULT 'active',
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "campaign_subscribers" (
  "id" TEXT PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
  "campaign_id" TEXT NOT NULL REFERENCES "campaigns" ("id") ON DELETE CASCADE,
  "subscriber_id" TEXT NOT NULL REFERENCES "subscribers" ("id") ON DELETE CASCADE,
  CONSTRAINT "campaign_subscriber_idx" UNIQUE ("campaign_id", "subscriber_id")
);