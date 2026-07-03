import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section, Card } from "@/components/showcase/page";

export const Route = createFileRoute("/foundations")({
  head: () => ({
    meta: [
      { title: "Foundations — BusinessOS Pro" },
      { name: "description", content: "Color, typography, spacing, radius, shadow, and motion tokens." },
      { property: "og:title", content: "Foundations — BusinessOS Pro" },
      { property: "og:description", content: "The token system that drives every component and page." },
    ],
  }),
  component: Foundations,
});

const BRAND = [
  { name: "primary", hex: "#2563EB", swatch: "bg-primary text-primary-foreground" },
  { name: "success", hex: "#16A34A", swatch: "bg-[color:var(--success)] text-[color:var(--success-foreground)]" },
  { name: "warning", hex: "#F59E0B", swatch: "bg-[color:var(--warning)] text-[color:var(--warning-foreground)]" },
  { name: "danger",  hex: "#DC2626", swatch: "bg-destructive text-destructive-foreground" },
  { name: "info",    hex: "#0EA5E9", swatch: "bg-[color:var(--info)] text-[color:var(--info-foreground)]" },
];

const SURFACE = [
  { name: "background", token: "--background", swatch: "bg-background border border-border text-foreground" },
  { name: "card",       token: "--card",       swatch: "bg-card border border-border text-card-foreground" },
  { name: "muted",      token: "--muted",      swatch: "bg-muted text-muted-foreground" },
  { name: "accent",     token: "--accent",     swatch: "bg-accent text-accent-foreground" },
  { name: "border",     token: "--border",     swatch: "bg-background border-2 border-border text-foreground" },
];

const SPACE = [4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96];
const RADII = [4, 8, 12, 16, 20, 24];
const TYPE = [
  { size: 72, label: "Display 72" },
  { size: 60, label: "Display 60" },
  { size: 48, label: "H1 · 48" },
  { size: 36, label: "H2 · 36" },
  { size: 30, label: "H3 · 30" },
  { size: 24, label: "H4 · 24" },
  { size: 20, label: "H5 · 20" },
  { size: 18, label: "Lead · 18" },
  { size: 16, label: "Body · 16" },
  { size: 14, label: "Small · 14" },
  { size: 12, label: "Micro · 12" },
];

const ELEVATIONS = [
  ["xs", "shadow-xs"],
  ["sm", "shadow-sm"],
  ["md", "shadow-md"],
  ["lg", "shadow-lg"],
  ["xl", "shadow-xl"],
  ["2xl", "shadow-2xl"],
] as const;

function Foundations() {
  return (
    <div>
      <PageHeader
        eyebrow="Foundations"
        title="Tokens that drive every pixel"
        description="Color, typography, spacing, radius, shadow, and motion — defined once in CSS variables and themed by the Theme Builder."
      />

      <Section title="Brand & status" description="Semantic intent colors with accessible foregrounds in light and dark.">
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {BRAND.map((c) => (
            <Card key={c.name} className="overflow-hidden">
              <div className={`h-24 ${c.swatch} grid place-items-center font-medium`}>{c.name}</div>
              <div className="p-3 text-xs">
                <div className="font-mono">{c.hex}</div>
                <div className="mt-1 text-muted-foreground">--{c.name}</div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Surfaces" description="Backgrounds, cards, muted areas, and borders.">
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {SURFACE.map((c) => (
            <Card key={c.name} className="overflow-hidden">
              <div className={`h-24 ${c.swatch} grid place-items-center font-medium`}>{c.name}</div>
              <div className="p-3 text-xs">
                <div className="font-mono">{c.token}</div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Typography" description="Inter for UI · Plus Jakarta Sans alt · JetBrains Mono for code.">
        <Card className="p-6 space-y-3">
          {TYPE.map((t) => (
            <div key={t.size} className="flex items-baseline gap-6 border-b border-border/60 last:border-0 pb-2 last:pb-0">
              <div className="w-24 text-xs text-muted-foreground font-mono">{t.label}</div>
              <div
                className="font-display font-semibold tracking-tight truncate"
                style={{ fontSize: `${t.size}px`, lineHeight: 1.1 }}
              >
                BusinessOS Pro
              </div>
            </div>
          ))}
        </Card>
      </Section>

      <Section title="Spacing scale" description="8px base — 4 / 8 / 12 / 16 / 24 / 32 / 40 / 48 / 64 / 80 / 96.">
        <Card className="p-6 space-y-2">
          {SPACE.map((s) => (
            <div key={s} className="flex items-center gap-4">
              <div className="w-12 text-xs text-muted-foreground font-mono">{s}px</div>
              <div className="h-3 rounded bg-primary" style={{ width: s * 2 }} />
            </div>
          ))}
        </Card>
      </Section>

      <Section title="Radius" description="4 → 24px scale. All radii are derived from --radius.">
        <div className="grid gap-3 grid-cols-3 sm:grid-cols-6">
          {RADII.map((r) => (
            <div key={r} className="grid place-items-center">
              <div
                className="h-20 w-20 bg-primary/15 border border-primary"
                style={{ borderRadius: `${r}px` }}
              />
              <div className="mt-2 text-xs text-muted-foreground font-mono">{r}px</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Elevation" description="Six steps, tinted with the active primary for cohesion.">
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {ELEVATIONS.map(([n, cls]) => (
            <div key={n} className="text-center">
              <div className={`h-24 rounded-xl bg-card border border-border ${cls}`} />
              <div className="mt-2 text-xs text-muted-foreground font-mono">{n}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Motion" description="Four tiers, gated by prefers-reduced-motion.">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["none", "0ms"],
            ["subtle", "120ms"],
            ["standard", "200ms"],
            ["expressive", "320ms"],
          ].map(([n, t]) => (
            <Card key={n} className="p-4">
              <div className="font-medium capitalize">{n}</div>
              <div className="text-xs text-muted-foreground font-mono">{t}</div>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}
