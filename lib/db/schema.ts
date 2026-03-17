import { pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// ... [existing user, team, etc. schema] ...

export const campaigns = pgTable("campaigns", {
  id: text("id")
    .notNull()
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  teamId: text("team_id")
    .notNull()
    .references(() => teams.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  subject: text("subject").notNull(),
  status: text("status").notNull().default("draft"),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  scheduledAt: timestamp("scheduled_at", { withTimezone: true }),
});

export const subscribers = pgTable("subscribers", {
  id: text("id")
    .notNull()
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  teamId: text("team_id")
    .notNull()
    .references(() => teams.id, { onDelete: "cascade" }),
  email: text("email").notNull(),
  name: text("name"),
  status: text("status").notNull().default("active"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const campaignSubscribers = pgTable(
  "campaign_subscribers",
  {
    id: text("id")
      .notNull()
      .default(sql`gen_random_uuid()`)
      .primaryKey(),
    campaignId: text("campaign_id")
      .notNull()
      .references(() => campaigns.id, { onDelete: "cascade" }),
    subscriberId: text("subscriber_id")
      .notNull()
      .references(() => subscribers.id, { onDelete: "cascade" }),
  },
  (table) => [
    uniqueIndex("campaign_subscriber_idx").on(
      table.campaignId,
      table.subscriberId
    ),
  ]
);