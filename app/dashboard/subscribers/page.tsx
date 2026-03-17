import { desc, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

import Client from "@/app/dashboard/subscribers/client";
import { getAuthSession } from "@/lib/auth/session";
import { db } from "@/lib/db/client";
import { subscribers, teamMembers } from "@/lib/db/schema";

export const dynamic = "force-dynamic";

type SubscribersPageProps = {
  searchParams?: Promise<{
    status?: string;
    message?: string;
  }>;
};

export default async function SubscribersPage({
  searchParams,
}: SubscribersPageProps) {
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
        subscribers={[]}
      />
    );
  }

  const results = await db
    .select({
      id: subscribers.id,
      email: subscribers.email,
      name: subscribers.name,
      status: subscribers.status,
      createdAt: subscribers.createdAt,
    })
    .from(subscribers)
    .where(eq(subscribers.teamId, membership.teamId))
    .orderBy(desc(subscribers.createdAt));

  return (
    <Client
      status={status}
      message={message}
      canManage={membership.role === "owner" || membership.role === "admin"}
      subscribers={results.map((s) => ({
        ...s,
        createdAt: s.createdAt.toISOString(),
      }))}
    />
  );
}