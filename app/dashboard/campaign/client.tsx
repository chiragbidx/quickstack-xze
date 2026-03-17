"use client";

import {
  createCampaignAction,
  deleteCampaignAction,
  updateCampaignAction,
  sendCampaignAction,
} from "@/app/dashboard/campaign/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, Send } from "lucide-react";

type Campaign = {
  id: string;
  name: string;
  subject: string;
  status: string;
  updatedAt: string;
  scheduledAt: string | null;
};

type ClientProps = {
  status: "success" | "error" | null;
  message: string | null;
  canManage: boolean;
  campaigns: Campaign[];
};

function formatTimestamp(iso: string | null) {
  if (!iso) return "Not scheduled";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "Unknown";
  const yyyy = date.getUTCFullYear();
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(date.getUTCDate()).padStart(2, "0");
  const hh = String(date.getUTCHours()).padStart(2, "0");
  const min = String(date.getUTCMinutes()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd} ${hh}:${min} UTC`;
}

export default function Client({ status, message, canManage, campaigns }: ClientProps) {
  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Email Campaigns</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Create, schedule, and send campaigns to your subscribers.
          </p>
        </header>
        {canManage ? (
          <Dialog>
            <DialogTrigger asChild>
              <Button>Create Campaign</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Campaign</DialogTitle>
                <DialogDescription>
                  Name your campaign and set a subject line.
                </DialogDescription>
              </DialogHeader>
              <form action={createCampaignAction} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="campaign-name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input id="campaign-name" name="name" required maxLength={80} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="campaign-subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input id="campaign-subject" name="subject" required maxLength={120} />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit">Create Campaign</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        ) : null}
      </div>

      {status && message ? (
        <p
          className={`rounded-md border px-3 py-2 text-sm ${
            status === "success"
              ? "border-emerald-500/30 text-emerald-600"
              : "border-destructive/30 text-destructive"
          }`}
        >
          {message}
        </p>
      ) : null}

      {!canManage ? (
        <p className="text-sm text-muted-foreground">
          Viewing campaigns as read-only. Only owner/admin can create, edit, schedule, or send.
        </p>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Campaigns</CardTitle>
          <CardDescription>Manage all of your team's email campaigns here.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead>Scheduled At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    No campaigns yet. Use Create Campaign to launch your first one.
                  </TableCell>
                </TableRow>
              ) : (
                campaigns.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.name}</TableCell>
                    <TableCell>{c.subject}</TableCell>
                    <TableCell>
                      <Badge variant={c.status === "draft" ? "secondary" : c.status === "scheduled" ? "default" : "default"}>
                        {c.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatTimestamp(c.updatedAt)}</TableCell>
                    <TableCell>{formatTimestamp(c.scheduledAt)}</TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" disabled={!canManage}>
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Campaign</DialogTitle>
                              <DialogDescription>
                                Update details or change the subject line.
                              </DialogDescription>
                            </DialogHeader>
                            <form action={updateCampaignAction} className="space-y-4">
                              <input type="hidden" name="id" value={c.id} />
                              <div className="space-y-2">
                                <label htmlFor={`name-${c.id}`} className="text-sm font-medium">
                                  Name
                                </label>
                                <Input
                                  id={`name-${c.id}`}
                                  name="name"
                                  defaultValue={c.name}
                                  required
                                  maxLength={80}
                                />
                              </div>
                              <div className="space-y-2">
                                <label htmlFor={`subject-${c.id}`} className="text-sm font-medium">
                                  Subject
                                </label>
                                <Input
                                  id={`subject-${c.id}`}
                                  name="subject"
                                  defaultValue={c.subject}
                                  required
                                  maxLength={120}
                                />
                              </div>
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button type="button" variant="outline">
                                    Cancel
                                  </Button>
                                </DialogClose>
                                <Button type="submit">Save Changes</Button>
                              </DialogFooter>
                            </form>
                          </DialogContent>
                        </Dialog>
                        <form action={deleteCampaignAction}>
                          <input type="hidden" name="id" value={c.id} />
                          <Button
                            type="submit"
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                            disabled={!canManage}
                          >
                            <Trash2 className="mr-1 size-4" />
                            Delete
                          </Button>
                        </form>
                        <form action={sendCampaignAction}>
                          <input type="hidden" name="id" value={c.id} />
                          <Button
                            type="submit"
                            variant="default"
                            size="sm"
                            className="bg-primary/80 hover:bg-primary"
                            disabled={!canManage}
                          >
                            <Send className="mr-1 size-4" />
                            Send
                          </Button>
                        </form>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
}