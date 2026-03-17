"use client";

import {
  createSubscriberAction,
  deleteSubscriberAction,
  updateSubscriberAction,
} from "@/app/dashboard/subscribers/actions";
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2 } from "lucide-react";

type Subscriber = {
  id: string;
  email: string;
  name: string | null;
  status: string;
  createdAt: string;
};

type ClientProps = {
  status: "success" | "error" | null;
  message: string | null;
  canManage: boolean;
  subscribers: Subscriber[];
};

function formatTimestamp(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "Unknown";
  const yyyy = date.getUTCFullYear();
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(date.getUTCDate()).padStart(2, "0");
  const hh = String(date.getUTCHours()).padStart(2, "0");
  const min = String(date.getUTCMinutes()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd} ${hh}:${min} UTC`;
}

export default function Client({ status, message, canManage, subscribers }: ClientProps) {
  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Subscribers</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your mailing list. Add, edit, or remove subscriber contacts.
          </p>
        </header>
        {canManage ? (
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add Subscriber</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Subscriber</DialogTitle>
                <DialogDescription>
                  Add a new subscriber to your email list.
                </DialogDescription>
              </DialogHeader>
              <form action={createSubscriberAction} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="subscriber-email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="subscriber-email" name="email" required maxLength={120} type="email" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="subscriber-name" className="text-sm font-medium">
                    Name <span className="text-muted-foreground">(optional)</span>
                  </label>
                  <Input id="subscriber-name" name="name" maxLength={80} />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit">Add Subscriber</Button>
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
          List is read-only. Only owner/admin can modify subscribers.
        </p>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Subscriber List</CardTitle>
          <CardDescription>
            Manage and review your current mailing list.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscribers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No subscribers yet. Use "Add Subscriber" to get started.
                  </TableCell>
                </TableRow>
              ) : (
                subscribers.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="font-medium">{s.email}</TableCell>
                    <TableCell>{s.name || "—"}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          s.status === "active"
                            ? "default"
                            : s.status === "bounced"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {s.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatTimestamp(s.createdAt)}</TableCell>
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
                              <DialogTitle>Edit Subscriber</DialogTitle>
                              <DialogDescription>
                                Update the subscriber's information.
                              </DialogDescription>
                            </DialogHeader>
                            <form action={updateSubscriberAction} className="space-y-4">
                              <input type="hidden" name="id" value={s.id} />
                              <div className="space-y-2">
                                <label htmlFor={`email-${s.id}`} className="text-sm font-medium">
                                  Email
                                </label>
                                <Input
                                  id={`email-${s.id}`}
                                  name="email"
                                  defaultValue={s.email}
                                  required
                                  maxLength={120}
                                  type="email"
                                />
                              </div>
                              <div className="space-y-2">
                                <label htmlFor={`name-${s.id}`} className="text-sm font-medium">
                                  Name
                                </label>
                                <Input
                                  id={`name-${s.id}`}
                                  name="name"
                                  defaultValue={s.name || ""}
                                  maxLength={80}
                                />
                              </div>
                              <div className="space-y-2">
                                <label htmlFor={`status-${s.id}`} className="text-sm font-medium">
                                  Status
                                </label>
                                <select
                                  id={`status-${s.id}`}
                                  name="status"
                                  defaultValue={s.status}
                                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                >
                                  <option value="active">active</option>
                                  <option value="bounced">bounced</option>
                                  <option value="unsubscribed">unsubscribed</option>
                                </select>
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
                        <form action={deleteSubscriberAction}>
                          <input type="hidden" name="id" value={s.id} />
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