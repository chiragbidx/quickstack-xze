import { desc, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

import Client from "@/app/dashboard/campaign/client";
import { getAuthSession } from "@/lib/auth/session";
import { db } from "@/lib/db/client";
import { campaigns, teamMembers } from "@/lib/db/schema";

export const dynamic = "force-dynamic";
// Purpose: Server route entry for /dashboard/campaign, similar to /dashboard/feature.

type CampaignPageProps = {
  searchParams?: Promise<{
    status?: string;
    message?: string;
  }>;
};

export default async function CampaignPage({
  searchParams,
}: CampaignPageProps) {
  const session = await getAuthSession();
  if (!session) redirect("/auth#signin");

  const [membership] = await db
    .select({
      teamId: teamMembers.teamId,
      role: teamMembers.role,
    })
    .from(teamMembers)
    .where(eq(teamMembers.userId, session.userId))
    .limit(1);

  const params = (await searchParams) ?? {};
  const status =
    params.status === "success" || params.status === "error"
      ? params.status
      : null;
  const message = typeof params.message === "string" ? params.message : null;

  if (!membership) {
    return (
      <Client
        status={status}
        message={message}
        canManage={false}
        campaigns={[]}
      />
    );
  }

  const results = await db
    .select({
      id: campaigns.id,
      name: campaigns.name,
      subject: campaigns.subject,
      status: campaigns.status,
      updatedAt: campaigns.updatedAt,
      scheduledAt: campaigns.scheduledAt,
    })
    .from(campaigns)
    .where(eq(campaigns.teamId, membership.teamId))
    .orderBy(desc(campaigns.updatedAt));

  return (
    <Client
      status={status}
      message={message}
      canManage={membership.role === "owner" || membership.role === "admin"}
      campaigns={results.map((c) => ({
        ...c,
        updatedAt: c.updatedAt.toISOString(),
        scheduledAt: c.scheduledAt ? c.scheduledAt.toISOString() : null,
      }))}
    />
  );
}