import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/demo/about")({
  head: () => ({
    meta: [
      { title: "About — Northwind" },
      { name: "description", content: "We're a team of operators building the platform we wished existed." },
      { property: "og:title", content: "About — Northwind" },
      { property: "og:description", content: "Our mission, story, and team." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div>
      <section className="mx-auto max-w-3xl px-6 pt-16 pb-10 text-center">
        <Badge variant="secondary">About</Badge>
        <h1 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-tight">Operators building for operators.</h1>
        <p className="mt-3 text-muted-foreground">We've run sales, ops, and CS at companies from 5 to 5,000 people. We've felt the pain of stitching tools together. So we built the one we wished existed.</p>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-16 grid gap-6 md:grid-cols-3">
        {[
          ["2021","Founded in Lisbon"],
          ["$24M","Series A from Sequoia"],
          ["4,000+","Teams running on Northwind"],
        ].map(([n, l]) => (
          <div key={l} className="rounded-xl border border-border bg-card p-6 text-center">
            <div className="font-display text-3xl font-semibold text-gradient-brand">{n}</div>
            <div className="mt-1 text-sm text-muted-foreground">{l}</div>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-20 prose-sm">
        <h2 className="font-display text-2xl font-semibold tracking-tight">Our values</h2>
        <ul className="mt-4 space-y-3 text-sm">
          <li><strong>Craft.</strong> Every screen, every detail, every edge case.</li>
          <li><strong>Speed.</strong> Onboard in minutes. Get value the same day.</li>
          <li><strong>Trust.</strong> Your data is yours. Export everything, anytime.</li>
          <li><strong>Accessibility.</strong> WCAG 2.2 AA is the floor, not the ceiling.</li>
        </ul>
      </section>
    </div>
  );
}
