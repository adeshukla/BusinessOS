import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section, Card } from "@/components/showcase/page";
import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/lib/theme/store";
import { Download, FileJson, Code2 } from "lucide-react";

export const Route = createFileRoute("/handoff")({
  head: () => ({
    meta: [
      { title: "Handoff — BusinessOS Pro" },
      { name: "description", content: "Token JSON, component inventory, accessibility spec, and porting notes for Next.js." },
      { property: "og:title", content: "Handoff — BusinessOS Pro" },
      { property: "og:description", content: "Everything your developers need to port the design system." },
    ],
  }),
  component: Handoff,
});

const A11Y = [
  ["Contrast", "All token pairings verified at WCAG 2.2 AA (4.5:1 body, 3:1 large) in both light and dark."],
  ["Keyboard", "Every interactive element is reachable via Tab; focus rings use --ring at 2px / 2px offset."],
  ["ARIA", "Built on Radix primitives — dialogs trap focus, menus have correct roles, tooltips read aria-describedby."],
  ["Motion", "Honors prefers-reduced-motion; .motion-none disables transitions globally."],
  ["Landmarks", "Single <main> per route, skip-to-content in __root, lang on <html>."],
  ["Targets", "44×44 minimum hit area on mobile (size='icon' buttons increase via padding utility)."],
];

const PORT = `// Next.js App Router porting checklist
// 1. Copy src/styles.css   -> app/globals.css   (already Tailwind v4)
// 2. Copy src/lib/theme/*  -> app/(lib)/theme/* (no changes needed)
// 3. Copy src/components/* -> app/(components)/*
// 4. Replace TanStack route files with App Router page.tsx:
//      src/routes/index.tsx           -> app/page.tsx
//      src/routes/foundations.tsx     -> app/foundations/page.tsx
//      src/routes/components.tsx      -> app/components/page.tsx
//      src/routes/theme-builder.tsx   -> app/theme-builder/page.tsx
//      src/routes/demo.tsx            -> app/demo/layout.tsx
//      src/routes/demo.index.tsx      -> app/demo/page.tsx
//      ...
// 5. Swap <Link to="..."> -> <Link href="..."> (next/link)
// 6. Move head() metadata to export const metadata = {...}
// 7. Keep ThemeBoot useEffect in a "use client" provider near root layout`;

function Handoff() {
  const { tokens } = useThemeStore();

  const exportTokens = () => {
    const blob = new Blob([JSON.stringify(tokens, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "businessos-theme.json"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <PageHeader
        eyebrow="Handoff"
        title="Developer handoff"
        description="Token JSON, component inventory, accessibility spec, and Next.js porting notes — everything required to ship."
        actions={<Button onClick={exportTokens}><Download /> Download tokens</Button>}
      />

      <Section title="Current token snapshot">
        <Card className="overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-muted text-muted-foreground text-xs">
            <FileJson className="h-4 w-4" /> businessos-theme.json
          </div>
          <pre className="p-4 text-xs overflow-auto font-mono">
{JSON.stringify(tokens, null, 2)}
          </pre>
        </Card>
      </Section>

      <Section title="Accessibility specification">
        <div className="grid gap-3 sm:grid-cols-2">
          {A11Y.map(([t, b]) => (
            <Card key={t} className="p-4">
              <div className="font-medium">{t}</div>
              <p className="text-sm text-muted-foreground mt-1">{b}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Component inventory">
        <Card className="p-5 text-sm font-mono leading-7">
          Button · Input · Label · Textarea · Checkbox · RadioGroup · Switch · Slider · Select · Tabs · Accordion · Dialog · Drawer · Sheet · Popover · Tooltip · DropdownMenu · Breadcrumb · Pagination · Badge · Alert · Avatar · Progress · Separator · Skeleton · Card · Table · Toast (Sonner) · Command · Calendar · Carousel · Sidebar
        </Card>
      </Section>

      <Section title="Porting to Next.js App Router">
        <Card className="overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-muted text-muted-foreground text-xs">
            <Code2 className="h-4 w-4" /> porting-checklist.ts
          </div>
          <pre className="p-4 text-xs overflow-auto font-mono whitespace-pre-wrap">{PORT}</pre>
        </Card>
      </Section>

      <Section title="Naming conventions">
        <Card className="p-5 text-sm space-y-2">
          <div><span className="font-mono text-primary">--color-*</span> — semantic color tokens (background, primary, accent, etc.)</div>
          <div><span className="font-mono text-primary">--radius-*</span> — derived from base --radius via calc()</div>
          <div><span className="font-mono text-primary">--shadow-*</span> — elevation tinted with --primary via color-mix()</div>
          <div><span className="font-mono text-primary">--font-*</span> — heading / body / code families</div>
          <div><span className="font-mono text-primary">.mode-*</span> — visual mode overlay classes on &lt;html&gt;</div>
          <div><span className="font-mono text-primary">.density-*</span>, <span className="font-mono text-primary">.motion-*</span> — global density and motion tier classes</div>
        </Card>
      </Section>
    </div>
  );
}
