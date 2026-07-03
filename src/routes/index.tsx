import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Section, Card } from "@/components/showcase/page";
import {
  Layers,
  Component,
  Boxes,
  Palette,
  FileCode2,
  Sparkles,
  Building2,
  ShieldCheck,
  Zap,
  Globe,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BusinessOS Pro — Overview" },
      {
        name: "description",
        content:
          "Premium enterprise design system, component library, and live Theme Builder for SaaS and commerce products.",
      },
      { property: "og:title", content: "BusinessOS Pro — Overview" },
      {
        property: "og:description",
        content:
          "A complete business operating system for designers and product teams.",
      },
    ],
  }),
  component: Overview,
});

const SECTIONS = [
  { to: "/foundations", icon: Layers, title: "Foundations", body: "Color, typography, spacing, radius, shadow, motion — all the tokens that drive every screen." },
  { to: "/components", icon: Component, title: "Components", body: "30+ atomic primitives built on Radix and shadcn, fully theme-aware and WCAG 2.2 AA." },
  { to: "/patterns", icon: Boxes, title: "Patterns", body: "Page-level compositions: navbars, heroes, pricing, dashboards, data tables, empty states." },
  { to: "/theme-builder", icon: Palette, title: "Theme Builder", body: "Live editor with 8 visual modes, JSON import/export, and instant CSS-variable preview." },
  { to: "/demo", icon: Sparkles, title: "Corporate demo", body: "A full marketing site rendered from tokens — edit the theme, watch it restyle." },
  { to: "/handoff", icon: FileCode2, title: "Handoff", body: "Token JSON, component inventory, accessibility spec, and Next.js porting notes." },
] as const;

const PRINCIPLES = [
  { icon: ShieldCheck, title: "Accessible by default", body: "WCAG 2.2 AA contrast, keyboard nav, focus rings, reduced motion." },
  { icon: Zap, title: "Performance first", body: "Token-driven CSS, no runtime CSS-in-JS, lazy-loaded routes, 95+ Lighthouse target." },
  { icon: Building2, title: "Enterprise UX", body: "Role-ready layouts, multi-tenant patterns, audit-trail and settings primitives." },
  { icon: Globe, title: "Portable", body: "Markup and tokens transfer 1:1 to Next.js App Router, Remix, or any React stack." },
] as const;

function Overview() {
  return (
    <div>
      <PageHeader
        eyebrow="BusinessOS Pro · v1"
        title="The design system for premium SaaS & commerce."
        description="A complete business operating system — design tokens, atomic components, page-level patterns, and a live Theme Builder. Built for agencies, founders, and enterprises who want to ship without a developer reinventing the wheel."
        actions={
          <>
            <Link
              to="/theme-builder"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-95"
            >
              Open Theme Builder
            </Link>
            <Link
              to="/demo"
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent"
            >
              View live demo
            </Link>
          </>
        }
      />

      <Section title="What's inside" description="Every surface needed to design and ship a polished SaaS or commerce product.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.to}
                to={s.to}
                className="group rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md"
              >
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="font-medium">{s.title}</div>
                <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
                <div className="mt-4 text-sm font-medium text-primary opacity-80 group-hover:opacity-100">
                  Explore →
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      <Section title="Design principles" description="The rules every screen in this system follows.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((p) => {
            const Icon = p.icon;
            return (
              <Card key={p.title} className="p-5">
                <Icon className="h-5 w-5 text-primary" />
                <div className="mt-3 font-medium">{p.title}</div>
                <p className="mt-1 text-sm text-muted-foreground">{p.body}</p>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section title="By the numbers">
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {[
            ["8", "Visual modes"],
            ["20", "Industry presets"],
            ["30+", "Atomic components"],
            ["100%", "WCAG 2.2 AA"],
          ].map(([n, l]) => (
            <Card key={l} className="p-6 text-center">
              <div className="font-display text-4xl font-semibold text-gradient-brand">{n}</div>
              <div className="mt-1 text-sm text-muted-foreground">{l}</div>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}
