import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Section, Card } from "@/components/showcase/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/patterns")({
  head: () => ({
    meta: [
      { title: "Patterns — BusinessOS Pro" },
      { name: "description", content: "Page-level compositions: navbars, heroes, pricing, FAQ, dashboard shells, empty states." },
      { property: "og:title", content: "Patterns — BusinessOS Pro" },
      { property: "og:description", content: "Production-ready page-level patterns built from the design system." },
    ],
  }),
  component: Patterns,
});

function Patterns() {
  return (
    <div>
      <PageHeader
        eyebrow="Patterns"
        title="Page-level compositions"
        description="Ready-to-ship marketing and product layouts assembled from the component library."
      />

      <Section title="Hero · split">
        <Card className="overflow-hidden">
          <div className="grid lg:grid-cols-2">
            <div className="p-8 lg:p-12">
              <Badge variant="secondary" className="gap-1"><Sparkles className="h-3 w-3" /> New · v1.0</Badge>
              <h3 className="mt-4 font-display text-3xl md:text-4xl font-semibold tracking-tight">
                Ship a business in a weekend.
              </h3>
              <p className="mt-3 text-muted-foreground max-w-md">
                Marketing site, storefront, CRM, and dashboard — all driven by the same design tokens.
              </p>
              <div className="mt-6 flex gap-2">
                <Button>Get started <ArrowRight /></Button>
                <Button variant="outline">View demo</Button>
              </div>
            </div>
            <div className="bg-grid relative min-h-[260px]">
              <div className="absolute inset-6 rounded-lg border border-border bg-card shadow-lg" />
              <div className="absolute right-12 top-12 rounded-lg border border-border bg-card p-4 shadow-md w-44">
                <div className="text-xs text-muted-foreground">Revenue</div>
                <div className="font-display text-2xl font-semibold">$184,210</div>
                <div className="text-xs text-[color:var(--success)]">+12.4%</div>
              </div>
            </div>
          </div>
        </Card>
      </Section>

      <Section title="Feature grid">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Theme Builder", "Live tokens, JSON import/export, 8 modes."],
            ["Atomic library", "30+ Radix-based primitives, fully themed."],
            ["Accessibility", "WCAG 2.2 AA, keyboard nav, reduced motion."],
            ["Mobile-first", "Responsive from 360 → 1536px."],
            ["Portable", "Markup transfers to Next.js, Remix, anywhere."],
            ["Performance", "Token CSS only — Lighthouse 95+ target."],
          ].map(([t, b]) => (
            <Card key={t} className="p-5">
              <div className="h-8 w-8 rounded-md gradient-brand grid place-items-center text-white">
                <Check className="h-4 w-4" />
              </div>
              <div className="mt-3 font-medium">{t}</div>
              <p className="mt-1 text-sm text-muted-foreground">{b}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Pricing">
        <div className="grid gap-4 lg:grid-cols-3">
          {[
            { name: "Starter", price: "$0", desc: "For solo founders.", cta: "Start free", features: ["1 workspace", "1k contacts", "Email support"] },
            { name: "Pro", price: "$49", desc: "For growing teams.", cta: "Start 14-day trial", features: ["5 seats", "Unlimited contacts", "API access", "Priority support"], highlight: true },
            { name: "Enterprise", price: "Custom", desc: "For organizations.", cta: "Contact sales", features: ["SSO + SAML", "Audit logs", "Dedicated CSM", "99.95% SLA"] },
          ].map((p) => (
            <Card key={p.name} className={`p-6 ${p.highlight ? "ring-2 ring-primary shadow-lg relative" : ""}`}>
              {p.highlight && (
                <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2">Most popular</Badge>
              )}
              <div className="text-sm font-medium text-muted-foreground">{p.name}</div>
              <div className="mt-1 font-display text-4xl font-semibold">
                {p.price}
                {p.price.startsWith("$") && p.price !== "$0" && <span className="text-base text-muted-foreground font-normal">/mo</span>}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
              <Button className="mt-5 w-full" variant={p.highlight ? "default" : "outline"}>{p.cta}</Button>
              <ul className="mt-5 space-y-2 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Auth · sign in">
        <Card className="max-w-md mx-auto p-6">
          <div className="text-center">
            <div className="h-10 w-10 mx-auto rounded-lg gradient-brand grid place-items-center text-white font-bold">B</div>
            <h3 className="mt-3 font-display text-xl font-semibold">Welcome back</h3>
            <p className="text-sm text-muted-foreground">Sign in to your workspace</p>
          </div>
          <div className="mt-5 space-y-3">
            <div><Label htmlFor="email">Email</Label><Input id="email" type="email" placeholder="you@company.com" /></div>
            <div><Label htmlFor="pwd">Password</Label><Input id="pwd" type="password" placeholder="••••••••" /></div>
            <Button className="w-full">Sign in</Button>
            <div className="relative my-2 text-center text-xs text-muted-foreground">
              <span className="bg-card px-2 relative z-10">or continue with</span>
              <div className="absolute inset-x-0 top-1/2 h-px bg-border -z-0" />
            </div>
            <Button variant="outline" className="w-full">Continue with Google</Button>
          </div>
        </Card>
      </Section>

      <Section title="Testimonial">
        <Card className="p-8 text-center">
          <div className="text-2xl font-display tracking-tight max-w-2xl mx-auto">
            "We replaced four separate tools with BusinessOS in a single sprint.
            The Theme Builder alone saved our team weeks of design work."
          </div>
          <div className="mt-5 flex items-center justify-center gap-3">
            <div className="h-10 w-10 rounded-full bg-accent grid place-items-center font-medium">SM</div>
            <div className="text-left">
              <div className="font-medium text-sm">Sara Mendes</div>
              <div className="text-xs text-muted-foreground">Head of Design · Northwind</div>
            </div>
          </div>
        </Card>
      </Section>

      <Section title="Footer · go to demo">
        <Card className="p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-display text-xl font-semibold">See it all in motion.</div>
            <p className="text-sm text-muted-foreground">A full marketing site + dashboard rendered from the active tokens.</p>
          </div>
          <Link to="/demo" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-95">
            View Corporate demo →
          </Link>
        </Card>
      </Section>
    </div>
  );
}
