import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section, Card } from "@/components/showcase/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, MoreHorizontal, Mail } from "lucide-react";

export const Route = createFileRoute("/components")({
  head: () => ({
    meta: [
      { title: "Components — BusinessOS Pro" },
      { name: "description", content: "30+ atomic primitives built on Radix and shadcn, fully theme-aware and accessible." },
      { property: "og:title", content: "Components — BusinessOS Pro" },
      { property: "og:description", content: "Atomic, accessible, token-driven UI primitives." },
    ],
  }),
  component: Components,
});

function Demo({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="p-5">
      <div className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</div>
      <div className="flex flex-wrap items-start gap-3">{children}</div>
    </Card>
  );
}

function Components() {
  return (
    <TooltipProvider>
      <PageHeader
        eyebrow="Components"
        title="Atomic, accessible, themed"
        description="Every primitive reads from CSS variables — change the theme, every component restyles."
      />

      <Section title="Buttons">
        <Demo title="Variants">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="destructive">Destructive</Button>
        </Demo>
        <div className="mt-3" />
        <Demo title="Sizes & states">
          <Button size="sm">Small</Button>
          <Button>Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon" aria-label="Email"><Mail /></Button>
          <Button disabled>Disabled</Button>
        </Demo>
      </Section>

      <Section title="Form controls">
        <div className="grid gap-4 lg:grid-cols-2">
          <Demo title="Text inputs">
            <div className="w-full space-y-3">
              <div><Label htmlFor="d-name">Full name</Label><Input id="d-name" placeholder="Ada Lovelace" /></div>
              <div><Label htmlFor="d-mail">Email</Label><Input id="d-mail" type="email" placeholder="ada@example.com" /></div>
              <div><Label htmlFor="d-bio">Bio</Label><Textarea id="d-bio" placeholder="Tell us about yourself…" /></div>
            </div>
          </Demo>
          <Demo title="Selection">
            <div className="w-full space-y-4">
              <div className="flex items-center gap-2"><Checkbox id="d-c1" defaultChecked /><Label htmlFor="d-c1">Subscribe to updates</Label></div>
              <div className="flex items-center justify-between"><Label htmlFor="d-sw">Email notifications</Label><Switch id="d-sw" defaultChecked /></div>
              <RadioGroup defaultValue="m" className="flex gap-4">
                {[["s","Starter"],["m","Pro"],["l","Enterprise"]].map(([v,l]) => (
                  <div key={v} className="flex items-center gap-2"><RadioGroupItem id={`r-${v}`} value={v} /><Label htmlFor={`r-${v}`}>{l}</Label></div>
                ))}
              </RadioGroup>
              <Select defaultValue="usd">
                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD — US Dollar</SelectItem>
                  <SelectItem value="eur">EUR — Euro</SelectItem>
                  <SelectItem value="gbp">GBP — British Pound</SelectItem>
                </SelectContent>
              </Select>
              <div><Label>Volume</Label><Slider defaultValue={[40]} max={100} step={1} /></div>
            </div>
          </Demo>
        </div>
      </Section>

      <Section title="Feedback">
        <div className="grid gap-4 lg:grid-cols-2">
          <Demo title="Alerts">
            <div className="w-full space-y-3">
              <Alert><AlertTitle>Heads up</AlertTitle><AlertDescription>You can theme this alert via the Theme Builder.</AlertDescription></Alert>
              <Alert variant="destructive"><AlertTitle>Payment failed</AlertTitle><AlertDescription>We couldn't charge your card. Update billing to retry.</AlertDescription></Alert>
            </div>
          </Demo>
          <Demo title="Badges & progress">
            <div className="w-full space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
              <Progress value={62} />
              <div className="flex items-center gap-2">
                <Avatar><AvatarFallback>AL</AvatarFallback></Avatar>
                <Avatar><AvatarFallback>JD</AvatarFallback></Avatar>
                <Avatar><AvatarFallback>+4</AvatarFallback></Avatar>
              </div>
            </div>
          </Demo>
        </div>
      </Section>

      <Section title="Overlays">
        <Demo title="Dialog · Popover · Tooltip · Dropdown">
          <Dialog>
            <DialogTrigger asChild><Button variant="outline">Open dialog</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite a teammate</DialogTitle>
                <DialogDescription>They'll get an email with access to your workspace.</DialogDescription>
              </DialogHeader>
              <div className="space-y-2">
                <Label htmlFor="invite">Email address</Label>
                <Input id="invite" placeholder="teammate@company.com" />
              </div>
              <DialogFooter><Button>Send invite</Button></DialogFooter>
            </DialogContent>
          </Dialog>

          <Popover>
            <PopoverTrigger asChild><Button variant="outline">Popover</Button></PopoverTrigger>
            <PopoverContent className="text-sm">Anchored content with a small arrow and elevation.</PopoverContent>
          </Popover>

          <Tooltip>
            <TooltipTrigger asChild><Button variant="ghost">Hover me</Button></TooltipTrigger>
            <TooltipContent>Keyboard accessible</TooltipContent>
          </Tooltip>

          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant="outline">Menu <ChevronDown /></Button></DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Demo>
      </Section>

      <Section title="Navigation & containers">
        <div className="grid gap-4 lg:grid-cols-2">
          <Demo title="Tabs">
            <Tabs defaultValue="orders" className="w-full">
              <TabsList>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="leads">Leads</TabsTrigger>
                <TabsTrigger value="customers">Customers</TabsTrigger>
              </TabsList>
              <TabsContent value="orders" className="text-sm text-muted-foreground pt-2">142 orders this week.</TabsContent>
              <TabsContent value="leads" className="text-sm text-muted-foreground pt-2">38 new leads.</TabsContent>
              <TabsContent value="customers" className="text-sm text-muted-foreground pt-2">1,204 customers.</TabsContent>
            </Tabs>
          </Demo>
          <Demo title="Accordion">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="a"><AccordionTrigger>Is there a free trial?</AccordionTrigger><AccordionContent>Yes — 14 days, no card required.</AccordionContent></AccordionItem>
              <AccordionItem value="b"><AccordionTrigger>Can I export my data?</AccordionTrigger><AccordionContent>Anytime, as CSV or JSON.</AccordionContent></AccordionItem>
              <AccordionItem value="c"><AccordionTrigger>Do you support SSO?</AccordionTrigger><AccordionContent>SAML SSO on Enterprise plan.</AccordionContent></AccordionItem>
            </Accordion>
          </Demo>
        </div>
      </Section>

      <Section title="Data display">
        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">MRR</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                ["Acme Inc.", "Enterprise", "Active", "$4,200"],
                ["Globex", "Pro", "Trialing", "$0"],
                ["Initech", "Pro", "Past due", "$890"],
                ["Hooli", "Starter", "Active", "$120"],
              ].map(([c, p, s, m]) => (
                <TableRow key={c}>
                  <TableCell className="font-medium">{c}</TableCell>
                  <TableCell>{p}</TableCell>
                  <TableCell>
                    <Badge variant={s === "Active" ? "secondary" : s === "Past due" ? "destructive" : "outline"}>{s}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono">{m}</TableCell>
                  <TableCell><Button size="icon" variant="ghost" aria-label="Row actions"><MoreHorizontal /></Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </Section>

      <Section title="Loading & empty">
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="p-5 space-y-3">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Separator />
            <Skeleton className="h-24 w-full" />
          </Card>
          <Card className="p-8 text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-accent grid place-items-center text-accent-foreground">📭</div>
            <div className="mt-3 font-medium">No invoices yet</div>
            <p className="text-sm text-muted-foreground">Send your first invoice to see it here.</p>
            <Button className="mt-4">Create invoice</Button>
          </Card>
        </div>
      </Section>
    </TooltipProvider>
  );
}
