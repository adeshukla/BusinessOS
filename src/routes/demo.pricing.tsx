import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export const Route = createFileRoute("/demo/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Northwind" },
      { name: "description", content: "Simple, transparent pricing for teams of every size. Starter, Pro, and Enterprise." },
      { property: "og:title", content: "Pricing — Northwind" },
      { property: "og:description", content: "Plans from $0 to Enterprise. 14-day free trial on every paid plan." },
    ],
  }),
  component: Pricing,
});

const PLANS = [
  { name: "Starter", price: "$0", desc: "For solo founders.", cta: "Start free", features: ["1 workspace", "Up to 1,000 contacts", "Community support", "Core integrations"] },
  { name: "Pro", price: "$49", desc: "For growing teams.", cta: "Start 14-day trial", highlight: true, features: ["Up to 5 seats", "Unlimited contacts", "Automation engine", "API access", "Priority support"] },
  { name: "Enterprise", price: "Custom", desc: "For organizations.", cta: "Contact sales", features: ["Unlimited seats", "SSO + SAML", "Audit logs & SCIM", "Dedicated CSM", "99.95% SLA"] },
];

const FAQ = [
  ["Is there a free trial?", "Yes — 14 days on Pro, no credit card required."],
  ["Can I change plans later?", "Anytime. Pro-rated charges or credits apply automatically."],
  ["Do you offer non-profit pricing?", "Yes — 50% off Pro for registered non-profits."],
  ["What payment methods do you accept?", "All major cards, ACH, wire transfer for Enterprise."],
];

function Pricing() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-10 text-center">
        <Badge variant="secondary">Pricing</Badge>
        <h1 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-tight">Pricing that scales with you.</h1>
        <p className="mt-3 text-muted-foreground">Simple, transparent plans. No hidden fees.</p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-4 lg:grid-cols-3">
          {PLANS.map((p) => (
            <div key={p.name} className={`relative rounded-xl border bg-card p-7 ${p.highlight ? "border-primary shadow-xl" : "border-border"}`}>
              {p.highlight && <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2">Most popular</Badge>}
              <div className="text-sm font-medium text-muted-foreground">{p.name}</div>
              <div className="mt-2 font-display text-4xl font-semibold">
                {p.price}
                {p.price.startsWith("$") && p.price !== "$0" && <span className="text-base text-muted-foreground font-normal">/mo</span>}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
              <Button className="mt-5 w-full" variant={p.highlight ? "default" : "outline"} asChild>
                <Link to="/demo/app">{p.cta}</Link>
              </Button>
              <ul className="mt-6 space-y-2 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />{f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-20">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-center">Frequently asked questions</h2>
        <div className="mt-6 divide-y divide-border rounded-xl border border-border bg-card">
          {FAQ.map(([q, a]) => (
            <details key={q} className="group p-5 open:bg-muted/40">
              <summary className="cursor-pointer font-medium list-none flex items-center justify-between">
                {q}<span className="text-primary group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">{a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
