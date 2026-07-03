import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Section, Card } from "@/components/showcase/page";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useThemeStore } from "@/lib/theme/store";
import { TYPOGRAPHY_PAIRS, DEFAULT_TOKENS, type VisualMode, type Density, type Motion } from "@/lib/theme/tokens";
import { MODE_PRESETS, THEME_VARIANTS, applyModePreset, applyVariant } from "@/lib/theme/presets";
import { useRef, useState } from "react";
import { Download, Upload, RotateCcw, ArrowRight, Check } from "lucide-react";

export const Route = createFileRoute("/theme-builder")({
  head: () => ({
    meta: [
      { title: "Theme Builder — BusinessOS Pro" },
      { name: "description", content: "Live editor for brand color, typography, radius, density, motion, and visual mode." },
      { property: "og:title", content: "Theme Builder — BusinessOS Pro" },
      { property: "og:description", content: "Edit tokens, watch every component restyle in real time." },
    ],
  }),
  component: ThemeBuilder,
});

const MODES: VisualMode[] = ["light","dark","glass","neumorphic","soft","minimal","luxury","enterprise"];
const DENSITIES: Density[] = ["compact","cozy","comfortable"];
const MOTIONS: Motion[] = ["none","subtle","standard","expressive"];

function Swatch({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-3">
      <label className="relative h-9 w-9 rounded-md border border-border overflow-hidden cursor-pointer shrink-0" style={{ background: value }}>
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="absolute inset-0 opacity-0 cursor-pointer" />
      </label>
      <div className="flex-1">
        <div className="text-xs text-muted-foreground">{label}</div>
        <Input value={value} onChange={(e) => onChange(e.target.value)} className="h-8 font-mono text-xs" />
      </div>
    </div>
  );
}

function ThemeBuilder() {
  const { tokens, setTokens, replace, reset } = useThemeStore();
  const fileRef = useRef<HTMLInputElement>(null);
  const [imported, setImported] = useState<string | null>(null);

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(tokens, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "businessos-theme.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJson = (file: File) => {
    file.text().then((t) => {
      try {
        const next = { ...DEFAULT_TOKENS, ...JSON.parse(t) };
        replace(next);
        setImported(file.name);
      } catch {
        setImported("Invalid JSON file");
      }
    });
  };

  return (
    <div>
      <PageHeader
        eyebrow="Theme Builder"
        title="Edit. See it restyle. Ship."
        description="Every control here writes to a CSS variable. Open any other page in a new tab — it picks up your edits."
        actions={
          <>
            <Button variant="outline" onClick={() => fileRef.current?.click()}><Upload /> Import</Button>
            <input ref={fileRef} type="file" accept="application/json" hidden onChange={(e) => e.target.files?.[0] && importJson(e.target.files[0])} />
            <Button variant="outline" onClick={exportJson}><Download /> Export JSON</Button>
            <Button variant="ghost" onClick={reset}><RotateCcw /> Reset</Button>
          </>
        }
      />

      {imported && (
        <div className="mx-auto max-w-6xl px-6 -mt-4">
          <div className="rounded-md border border-border bg-accent text-accent-foreground px-3 py-2 text-sm">
            <Check className="inline h-4 w-4 mr-2" />{imported.startsWith("Invalid") ? imported : `Loaded ${imported}`}
          </div>
        </div>
      )}

      <div className="mx-auto max-w-6xl px-6 py-8 grid gap-6 lg:grid-cols-[360px_1fr]">
        {/* Controls */}
        <Card className="p-5 space-y-6 self-start lg:sticky lg:top-4">
          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">Visual mode</div>
            <div className="grid grid-cols-2 gap-2">
              {MODES.map((m) => (
                <button
                  key={m}
                  onClick={() => replace(applyModePreset(tokens, m))}
                  className={`rounded-md border px-3 py-2 text-sm capitalize text-left ${
                    tokens.mode === m ? "border-primary bg-accent text-accent-foreground font-medium" : "border-border hover:bg-accent/50"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">Brand colors</div>
            <div className="space-y-3">
              <Swatch label="Primary" value={tokens.primary} onChange={(v) => setTokens({ primary: v })} />
              <Swatch label="Accent" value={tokens.accent} onChange={(v) => setTokens({ accent: v })} />
              <Swatch label="Secondary" value={tokens.secondary} onChange={(v) => setTokens({ secondary: v })} />
              <div className="grid grid-cols-2 gap-3 pt-1">
                <Swatch label="Success" value={tokens.success} onChange={(v) => setTokens({ success: v })} />
                <Swatch label="Warning" value={tokens.warning} onChange={(v) => setTokens({ warning: v })} />
                <Swatch label="Danger" value={tokens.danger} onChange={(v) => setTokens({ danger: v })} />
                <Swatch label="Info" value={tokens.info} onChange={(v) => setTokens({ info: v })} />
              </div>
            </div>
          </div>

          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">Typography</div>
            <Select value={tokens.typography} onValueChange={(v) => setTokens({ typography: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {TYPOGRAPHY_PAIRS.map((p) => (
                  <SelectItem key={p.id} value={p.id}>{p.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Radius</div>
              <div className="text-xs font-mono">{tokens.radius.toFixed(2)}rem</div>
            </div>
            <Slider value={[tokens.radius * 100]} min={0} max={200} step={5} onValueChange={(v) => setTokens({ radius: v[0] / 100 })} />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Elevation</div>
              <div className="text-xs font-mono">{tokens.elevation.toFixed(1)}×</div>
            </div>
            <Slider value={[tokens.elevation * 50]} min={0} max={150} step={5} onValueChange={(v) => setTokens({ elevation: v[0] / 50 })} />
          </div>

          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Density</div>
            <div className="flex gap-1">
              {DENSITIES.map((d) => (
                <button key={d} onClick={() => setTokens({ density: d })} className={`flex-1 rounded-md border px-2 py-1.5 text-xs capitalize ${tokens.density === d ? "border-primary bg-accent" : "border-border"}`}>{d}</button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Motion</div>
            <div className="flex gap-1">
              {MOTIONS.map((m) => (
                <button key={m} onClick={() => setTokens({ motion: m })} className={`flex-1 rounded-md border px-2 py-1.5 text-xs capitalize ${tokens.motion === m ? "border-primary bg-accent" : "border-border"}`}>{m}</button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Industry preset</div>
            <Select onValueChange={(v) => replace(applyVariant(tokens, v))}>
              <SelectTrigger><SelectValue placeholder="Choose a vertical…" /></SelectTrigger>
              <SelectContent className="max-h-72">
                {THEME_VARIANTS.map((v) => (
                  <SelectItem key={v.id} value={v.id}>
                    <span className="inline-block h-2.5 w-2.5 rounded-full mr-2 align-middle" style={{ background: v.primary }} />
                    {v.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Preview */}
        <div className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="secondary">Live preview</Badge>
              <Link to="/demo" className="text-sm font-medium text-primary inline-flex items-center gap-1">
                See full demo <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Mini hero */}
            <div className="rounded-lg border border-border bg-card p-6">
              <Badge>New in v1.0</Badge>
              <h3 className="mt-3 font-display text-2xl font-semibold">A business in a weekend.</h3>
              <p className="mt-1 text-sm text-muted-foreground">Token-driven, accessible, mobile-first.</p>
              <div className="mt-4 flex gap-2">
                <Button>Get started</Button>
                <Button variant="outline">Docs</Button>
              </div>
            </div>

            {/* Mini cards */}
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {["Revenue","Orders","MRR"].map((t, i) => (
                <div key={t} className="rounded-lg border border-border bg-card p-4">
                  <div className="text-xs text-muted-foreground">{t}</div>
                  <div className="font-display text-2xl font-semibold mt-1">${[84210, 1284, 24500][i].toLocaleString()}</div>
                  <div className="text-xs text-[color:var(--success)]">+{[12.4, 8.1, 4.2][i]}%</div>
                </div>
              ))}
            </div>

            {/* Mini form */}
            <div className="mt-4 rounded-lg border border-border bg-card p-4">
              <Label htmlFor="prev">Workspace name</Label>
              <div className="mt-1 flex gap-2"><Input id="prev" defaultValue="Acme HQ" /><Button>Save</Button></div>
            </div>
          </Card>

          {/* Mode preset cards */}
          <Card className="p-5">
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">Quick mode swatches</div>
            <div className="grid gap-2 grid-cols-4">
              {(Object.keys(MODE_PRESETS) as VisualMode[]).map((m) => (
                <button key={m} onClick={() => replace(applyModePreset(tokens, m))} className="text-left rounded-md border border-border p-3 hover:shadow-md">
                  <div className="text-xs font-medium capitalize">{m}</div>
                  <div className="text-[10px] text-muted-foreground">click to apply</div>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
