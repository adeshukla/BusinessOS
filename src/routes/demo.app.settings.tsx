import { createFileRoute, Link } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Palette } from "lucide-react";

export const Route = createFileRoute("/demo/app/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Northwind Dashboard" },
      { name: "description", content: "Workspace profile, team, billing, and security." },
    ],
  }),
  component: Settings,
});

function Settings() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-semibold tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground">Manage your workspace and preferences.</p>
        </div>
        <Link to="/theme-builder" className="inline-flex items-center gap-1.5 rounded-md border border-input bg-background px-3 py-1.5 text-sm hover:bg-accent">
          <Palette className="h-4 w-4" /> Open Theme Builder
        </Link>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="pt-4">
          <div className="rounded-xl border border-border bg-card p-6 space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14"><AvatarFallback>SM</AvatarFallback></Avatar>
              <div>
                <Button variant="outline" size="sm">Change avatar</Button>
                <p className="mt-1 text-xs text-muted-foreground">PNG, JPG up to 2MB</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div><Label htmlFor="fn">First name</Label><Input id="fn" defaultValue="Sara" /></div>
              <div><Label htmlFor="ln">Last name</Label><Input id="ln" defaultValue="Mendes" /></div>
              <div className="sm:col-span-2"><Label htmlFor="em">Email</Label><Input id="em" defaultValue="sara@northwind.example" /></div>
              <div className="sm:col-span-2"><Label htmlFor="ws">Workspace name</Label><Input id="ws" defaultValue="Northwind HQ" /></div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="ghost">Cancel</Button>
              <Button>Save changes</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="team" className="pt-4">
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            {[
              ["Sara Mendes", "sara@northwind.example", "Owner"],
              ["Alex Park", "alex@northwind.example", "Admin"],
              ["Jordan Lee", "jordan@northwind.example", "Editor"],
              ["Sam Riley", "sam@northwind.example", "Support"],
            ].map(([n, e, r]) => (
              <div key={e} className="flex items-center justify-between p-4 border-b last:border-0 border-border">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9"><AvatarFallback>{n.split(" ").map(s => s[0]).join("")}</AvatarFallback></Avatar>
                  <div>
                    <div className="text-sm font-medium">{n}</div>
                    <div className="text-xs text-muted-foreground">{e}</div>
                  </div>
                </div>
                <Badge variant={r === "Owner" ? "default" : "secondary"}>{r}</Badge>
              </div>
            ))}
            <div className="p-4 bg-muted/40 flex justify-end"><Button size="sm">Invite teammate</Button></div>
          </div>
        </TabsContent>

        <TabsContent value="billing" className="pt-4">
          <div className="rounded-xl border border-border bg-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Current plan</div>
                <div className="font-display text-2xl font-semibold">Pro · $49/mo</div>
              </div>
              <Button variant="outline">Change plan</Button>
            </div>
            <div className="border-t border-border pt-4">
              <div className="text-sm font-medium mb-2">Payment method</div>
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-12 rounded bg-foreground text-background grid place-items-center text-xs font-bold">VISA</div>
                  <div className="text-sm">•••• •••• •••• 4242 · exp 09/27</div>
                </div>
                <Button variant="ghost" size="sm">Update</Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security" className="pt-4">
          <div className="rounded-xl border border-border bg-card p-6 space-y-4">
            {[
              ["Two-factor authentication", "Require a 6-digit code at sign-in.", true],
              ["Single sign-on (SSO)", "Allow members to sign in via Google Workspace.", true],
              ["Session activity", "Get an email when your account signs in from a new device.", false],
            ].map(([t, d, v]) => (
              <div key={t as string} className="flex items-start justify-between gap-4 border-b last:border-0 border-border pb-4 last:pb-0">
                <div>
                  <div className="text-sm font-medium">{t}</div>
                  <div className="text-xs text-muted-foreground">{d}</div>
                </div>
                <Switch defaultChecked={v as boolean} />
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
