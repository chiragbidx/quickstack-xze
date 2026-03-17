"use server";

import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { z } from "zod";

import { getAuthSession } from "@/lib/auth/session";
import { db } from "@/lib/db/client";
import { campaigns, teamMembers, subscribers, campaignSubscribers } from "@/lib/db/schema";
import { sendEmail } from "@/lib/email/sendgrid";

// Helper to standardize feedback
function redirectWithMessage(status: "success" | "error", message: string): never {
  const query = new URLSearchParams({ status, message });
  redirect(`/dashboard/campaign?${query.toString()}`);
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
    redirectWithMessage("error", "You must belong to a team to use campaigns.");
  }

  return membership;
}

async function requireManageRole(userId: string) {
  const membership = await requireTeamMembership(userId);
  if (!["owner", "admin"].includes(membership.role)) {
    redirectWithMessage("error", "Only owner/admin can manage campaigns.");
  }
  return membership;
}

const createCampaignSchema = z.object({
  name: z.string().trim().min(1, "Name is required.").max(80, "Name too long."),
  subject: z.string().trim().min(1, "Subject is required.").max(120, "Subject too long."),
});

const updateCampaignSchema = createCampaignSchema.extend({
  id: z.string().trim().min(1, "Campaign ID required."),
});

const deleteCampaignSchema = z.object({
  id: z.string().trim().min(1, "Campaign ID required."),
});

// Basic template (expand later)
const emailHtmlTemplate = (subject: string) => `<html><body><h2>${subject}</h2><p>This is a MailForge campaign.</p></body></html>`;

// CREATE
export async function createCampaignAction(formData: FormData) {
  const parsed = createCampaignSchema.safeParse({
    name: formData.get("name"),
    subject: formData.get("subject"),
  });

  if (!parsed.success) {
    redirectWithMessage("error", parsed.error.issues[0]?.message ?? "Invalid create request.");
  }

  const session = await getAuthSession();
  if (!session) redirect("/auth#signin");

  const membership = await requireManageRole(session.userId);

  await db.insert(campaigns).values({
    teamId: membership.teamId,
    name: parsed.data.name,
    subject: parsed.data.subject,
    status: "draft",
    updatedAt: new Date(),
  });

  redirectWithMessage("success", "Campaign created.");
}

// UPDATE
export async function updateCampaignAction(formData: FormData) {
  const parsed = updateCampaignSchema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
    subject: formData.get("subject"),
  });

  if (!parsed.success) {
    redirectWithMessage("error", parsed.error.issues[0]?.message ?? "Invalid update.");
  }

  const session = await getAuthSession();
  if (!session) redirect("/auth#signin");

  const membership = await requireManageRole(session.userId);

  await db
    .update(campaigns)
    .set({
      name: parsed.data.name,
      subject: parsed.data.subject,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(campaigns.id, parsed.data.id),
        eq(campaigns.teamId, membership.teamId)
      )
    );

  redirectWithMessage("success", "Campaign updated.");
}

// DELETE
export async function deleteCampaignAction(formData: FormData) {
  const parsed = deleteCampaignSchema.safeParse({
    id: formData.get("id"),
  });
  if (!parsed.success) {
    redirectWithMessage("error", parsed.error.issues[0]?.message ?? "Invalid delete request.");
  }

  const session = await getAuthSession();
  if (!session) redirect("/auth#signin");

  const membership = await requireManageRole(session.userId);

  await db
    .delete(campaigns)
    .where(
      and(
        eq(campaigns.id, parsed.data.id),
        eq(campaigns.teamId, membership.teamId)
      )
    );
  redirectWithMessage("success", "Campaign deleted.");
}

// SEND — Demo logic: sends to all subscribers immediately with a simple template.
export async function sendCampaignAction(formData: FormData) {
  const campaignId = formData.get("id");
  if (!campaignId || typeof campaignId !== "string") {
    redirectWithMessage("error", "Missing campaign ID.");
  }

  const session = await getAuthSession();
  if (!session) redirect("/auth#signin");
  const membership = await requireManageRole(session.userId);

  // Get campaign data
  const [campaign] = await db
    .select({
      id: campaigns.id,
      subject: campaigns.subject,
      teamId: campaigns.teamId,
      status: campaigns.status,
      name: campaigns.name,
    })
    .from(campaigns)
    .where(and(eq(campaigns.id, campaignId), eq(campaigns.teamId, membership.teamId)))
    .limit(1);

  if (!campaign) {
    redirectWithMessage("error", "Campaign not found.");
  }

  // Get all subscribers for this team
  const allSubs = await db
    .select({ email: subscribers.email })
    .from(subscribers)
    .innerJoin(
      campaignSubscribers,
      and(
        eq(campaignSubscribers.subscriberId, subscribers.id),
        eq(campaignSubscribers.campaignId, campaign.id)
      )
    );

  let anySent = false;
  for (const { email } of allSubs) {
    // SendGrid integration logic
    const { success, error } = await sendEmail(
      email,
      campaign.subject,
      emailHtmlTemplate(campaign.subject)
    );
    anySent = anySent || success;
    // Optionally log/send failure per recipient or batch status
  }

  // Mark as sent with timestamp
  await db
    .update(campaigns)
    .set({ status: "sent", updatedAt: new Date() })
    .where(eq(campaigns.id, campaign.id));

  if (anySent) {
    redirectWithMessage("success", "Campaign sent to subscribers.");
  } else {
    redirectWithMessage("error", "No emails were sent—check list or config.");
  }
}