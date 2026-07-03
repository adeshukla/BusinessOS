import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Users, Workflow, ShieldCheck, Zap, Globe, Database, Bell, Plug } from "lucide-react";

export const Route = createFileRoute("/demo/features")({
  head: () => ({
    meta: [
      { title: "Features — Northwind" },
      { name: "description", content: "CRM, workflows, analytics, and governance — everything modern operations teams need." },
      { property: "og:title", content: "Features — Northwind" },
      { property: "og:description", content: "A complete operations platform in one product." },
    ],
  }),
  component: Features,
});

const FEATURES = [
  { i: Users, t: "Modern CRM", b: "Pipeline, contacts, activity timelines, custom fields, and tags — all schema-driven and instantly searchable." },
  { i: Workflow, t: "Visual workflows", b: "Drag-and-drop automation with branching, delays, and triggers across every module." },
  { i: BarChart3, t: "Realtime analytics", b: "Revenue, retention, cohort analysis, and exportable reports with one-click sharing." },
  { i: ShieldCheck, t: "Enterprise security", b: "SSO/SAML, SCIM provisioning, audit logs, role-based access, and SOC 2 Type II." },
  { i: Zap, t: "Lightning fast", b: "Edge-rendered pages, instant search, and a < 200ms time-to-interactive on every screen." },
  { i: Globe, t: "Built for global", b: "12 locales, RTL support, multi-currency, and tax-compliant invoicing out of the box." },
  { i: Database, t: "Open data", b: "Export everything as CSV or via API. Your data is always yours." },
  { i: Bell, t: "Smart alerts", b: "Anomaly detection on revenue, churn, and engagement — delivered to email, Slack, or webhook." },
  { i: Plug, t: "100+ integrations", b: "Stripe, HubSpot, Salesforce, Zapier, Make, n8n, and a public API for the rest." },
];

function Features() {
  return (
    <div>
      <section className="mx-auto max-w-3xl px-6 pt-16 pb-10 text-center">
        <Badge variant="secondary">Features</Badge>
        <h1 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-tight">A complete operations platform.</h1>
        <p className="mt-3 text-muted-foreground">Every tool your team needs — designed to work together from day one.</p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ i: Icon, t, b }) => (
            <div key={t} className="rounded-xl border border-border bg-card p-6">
              <div className="h-10 w-10 rounded-lg bg-accent text-accent-foreground grid place-items-center"><Icon className="h-5 w-5" /></div>
              <div className="mt-4 font-medium">{t}</div>
              <p className="mt-1 text-sm text-muted-foreground">{b}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
