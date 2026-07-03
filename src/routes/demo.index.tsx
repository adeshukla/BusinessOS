import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Check, BarChart3, Users, Workflow, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/demo/")({
  head: () => ({
    meta: [
      { title: "Northwind — Operations Platform for Modern Teams" },
      { name: "description", content: "One platform for sales, ops, and customer success. Trusted by 4,000+ teams." },
      { property: "og:title", content: "Northwind" },
      { property: "og:description", content: "One platform for sales, ops, and CS." },
    ],
  }),
  component: DemoHome,
});

function DemoHome() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <Badge variant="secondary" className="gap-1"><Sparkles className="h-3 w-3" /> v3.0 just shipped</Badge>
          <h1 className="mt-5 font-display text-4xl md:text-6xl font-semibold tracking-tight">
            Run your <span className="text-gradient-brand">entire business</span><br className="hidden md:block" /> from one platform.
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-lg text-muted-foreground">
            Sales, operations, and customer success — unified, automated, and beautifully designed.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-2 justify-center">
            <Link to="/demo/app" className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-95">
              Start free trial <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
            <Link to="/demo/features" className="inline-flex items-center justify-center rounded-md border border-input bg-background px-5 py-2.5 text-sm font-medium hover:bg-accent">
              Explore features
            </Link>
          </div>
          <div className="mt-3 text-xs text-muted-foreground">14-day trial · No card required · Cancel anytime</div>

          {/* Product visual */}
          <div className="mt-14 relative mx-auto max-w-4xl">
            <div className="rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
              <div className="h-9 border-b border-border bg-muted/40 flex items-center gap-1.5 px-3">
                <div className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-[color:var(--warning)]/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-[color:var(--success)]/60" />
              </div>
              <div className="p-6 grid gap-4 md:grid-cols-3 text-left">
                {[
                  ["Revenue", "$184,210", "+12.4%"],
                  ["Customers", "1,284", "+8.1%"],
                  ["NPS", "62", "+4 pts"],
                ].map(([l, v, d]) => (
                  <div key={l} className="rounded-lg border border-border bg-background p-4">
                    <div className="text-xs text-muted-foreground">{l}</div>
                    <div className="font-display text-2xl font-semibold mt-1">{v}</div>
                    <div className="text-xs text-[color:var(--success)] mt-1">{d}</div>
                  </div>
                ))}
              </div>
              <div className="px-6 pb-6">
                <div className="rounded-lg border border-border bg-background h-44 grid place-items-center text-muted-foreground text-sm">
                  Revenue · last 30 days
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos */}
      <section className="py-10 border-y border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Trusted by 4,000+ teams</div>
          <div className="mt-4 flex flex-wrap justify-center gap-x-10 gap-y-3 opacity-70 font-display text-lg">
            {["Acme","Globex","Initech","Hooli","Soylent","Umbrella","Wayne","Stark"].map((b) => (
              <div key={b}>{b}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <Badge variant="outline">Features</Badge>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold tracking-tight">Everything in one place.</h2>
          <p className="mt-3 text-muted-foreground">Stop stitching tools together. Northwind covers the full operating loop.</p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { i: Workflow, t: "Workflows", b: "Visual automation for every process." },
            { i: Users, t: "CRM", b: "Pipeline, contacts, activities — unified." },
            { i: BarChart3, t: "Analytics", b: "Realtime metrics with cohort drill-down." },
            { i: ShieldCheck, t: "Governance", b: "SSO, audit logs, role-based access." },
          ].map(({ i: Icon, t, b }) => (
            <div key={t} className="rounded-xl border border-border bg-card p-6">
              <div className="h-9 w-9 rounded-lg gradient-brand grid place-items-center text-white"><Icon className="h-4 w-4" /></div>
              <div className="mt-4 font-medium">{t}</div>
              <p className="mt-1 text-sm text-muted-foreground">{b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-muted/30 border-y border-border">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <div className="font-display text-2xl md:text-3xl tracking-tight">
            "Northwind replaced four tools in our stack and our team is faster than ever."
          </div>
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="h-10 w-10 rounded-full bg-accent grid place-items-center font-medium">SM</div>
            <div className="text-left">
              <div className="font-medium text-sm">Sara Mendes</div>
              <div className="text-xs text-muted-foreground">Head of Operations, Acme</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight">Ready to run your business better?</h2>
        <p className="mt-3 text-muted-foreground">Start your 14-day free trial. Onboard in under 10 minutes.</p>
        <div className="mt-6 flex justify-center gap-2">
          <Button asChild><Link to="/demo/app">Start free trial</Link></Button>
          <Button variant="outline" asChild><Link to="/demo/pricing">See pricing</Link></Button>
        </div>
      </section>
    </div>
  );
}
