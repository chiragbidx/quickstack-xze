"use server";

import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getAuthSession } from "@/lib/auth/session";
import { db } from "@/lib/db/client";
import { subscribers, teamMembers } from "@/lib/db/schema";

function redirectWithMessage(status: "success" | "error", message: string): never {
  const query = new URLSearchParams({ status, message });
  redirect(`/dashboard/subscribers?${query.toString()}`);
}

async function requireTeamMembership(userId: string) {
  const [membership] = await db
    .select({
      teamId: teamMembers.teamId,
      role: teamMembers.role,
    })
    .from(teamMembers)
    .where(eq(teamMembers.userId, userId))
    .limit(1);

  if (!membership) {
    redirectWithMessage("error", "You must belong to a team.");
  }

  return membership;
}

async function requireManageRole(userId: string) {
  const membership = await requireTeamMembership(userId);
  if (!["owner", "admin"].includes(membership.role)) {
    redirectWithMessage("error", "Only owner or admin can modify subscribers.");
  }
  return membership;
}

const createSubscriberSchema = z.object({
  email: z.string().trim().email("A valid email is required.").min(1, "Email required.").max(120, "Too long."),
  name: z.string().trim().max(80, "Name too long.").optional(),
});

const updateSubscriberSchema = createSubscriberSchema.extend({
  id: z.string().trim().min(1, "Subscriber id required."),
  status: z.enum(["active", "bounced", "unsubscribed"]).optional(),
});

const deleteSubscriberSchema = z.object({
  id: z.string().trim().min(1, "Subscriber id required."),
});

// CREATE
export async function createSubscriberAction(formData: FormData) {
  const parsed = createSubscriberSchema.safeParse({
    email: formData.get("email"),
    name: formData.get("name"),
  });

  if (!parsed.success) {
    redirectWithMessage("error", parsed.error.issues[0]?.message ?? "Validation failed.");
  }

  const session = await getAuthSession();
  if (!session) redirect("/auth#signin");
  const membership = await requireManageRole(session.userId);

  await db.insert(subscribers).values({
    teamId: membership.teamId,
    email: parsed.data.email,
    name: parsed.data.name || null,
    status: "active",
    createdAt: new Date(),
  });

  redirectWithMessage("success", "Subscriber added.");
}

// UPDATE
export async function updateSubscriberAction(formData: FormData) {
  const parsed = updateSubscriberSchema.safeParse({
    id: formData.get("id"),
    email: formData.get("email"),
    name: formData.get("name"),
    status: formData.get("status"),
  });

  if (!parsed.success) {
    redirectWithMessage("error", parsed.error.issues[0]?.message ?? "Validation failed.");
  }

  const session = await getAuthSession();
  if (!session) redirect("/auth#signin");
  const membership = await requireManageRole(session.userId);

  await db
    .update(subscribers)
    .set({
      email: parsed.data.email,
      name: parsed.data.name || null,
      status: parsed.data.status || "active",
    })
    .where(
      and(
        eq(subscribers.id, parsed.data.id),
        eq(subscribers.teamId, membership.teamId)
      )
    );

  redirectWithMessage("success", "Subscriber updated.");
}

// DELETE
export async function deleteSubscriberAction(formData: FormData) {
  const parsed = deleteSubscriberSchema.safeParse({
    id: formData.get("id"),
  });
  if (!parsed.success) {
    redirectWithMessage("error", parsed.error.issues[0]?.message ?? "Validation failed.");
  }

  const session = await getAuthSession();
  if (!session) redirect("/auth#signin");
  const membership = await requireManageRole(session.userId);

  await db
    .delete(subscribers)
    .where(
      and(
        eq(subscribers.id, parsed.data.id),
        eq(subscribers.teamId, membership.teamId)
      )
    );

  redirectWithMessage("success", "Subscriber deleted.");
}