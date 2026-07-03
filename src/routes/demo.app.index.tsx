import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/demo/app/")({
  head: () => ({
    meta: [
      { title: "Overview — Northwind Dashboard" },
      { name: "description", content: "Operations overview: revenue, orders, leads, and recent activity." },
    ],
  }),
  component: Overview,
});

const KPIS = [
  { label: "Revenue", value: "$184,210", delta: "+12.4%", up: true },
  { label: "Active customers", value: "1,284", delta: "+8.1%", up: true },
  { label: "New leads (7d)", value: "342", delta: "-3.2%", up: false },
  { label: "Conversion rate", value: "4.8%", delta: "+0.6 pts", up: true },
];

const RECENT = [
  ["Acme Inc.", "Enterprise", "Active", "$4,200"],
  ["Globex", "Pro", "Trialing", "$0"],
  ["Initech", "Pro", "Past due", "$890"],
  ["Hooli", "Starter", "Active", "$120"],
  ["Soylent", "Pro", "Active", "$490"],
  ["Wayne", "Enterprise", "Active", "$6,800"],
];

function Bar({ h }: { h: number }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="w-6 rounded-t-md bg-primary/80" style={{ height: `${h}%` }} />
    </div>
  );
}

function Overview() {
  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-semibold tracking-tight">Good morning, Sara</h1>
          <p className="text-sm text-muted-foreground">Here's what's happening across your workspace.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export</Button>
          <Button>New invoice</Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {KPIS.map((k) => (
          <div key={k.label} className="rounded-xl border border-border bg-card p-5">
            <div className="text-xs text-muted-foreground">{k.label}</div>
            <div className="mt-1 font-display text-2xl font-semibold">{k.value}</div>
            <div className={`mt-1 inline-flex items-center gap-1 text-xs ${k.up ? "text-[color:var(--success)]" : "text-destructive"}`}>
              {k.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {k.delta}
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Revenue · last 30 days</div>
              <div className="text-xs text-muted-foreground">Daily, USD</div>
            </div>
            <Badge variant="secondary">Live</Badge>
          </div>
          <div className="mt-6 h-40 flex items-end gap-1.5">
            {[35, 48, 42, 60, 55, 70, 65, 78, 72, 84, 80, 92, 88, 96, 90, 75, 82, 88, 94, 100, 86, 92, 78, 84, 90, 95, 88, 94, 98, 100].map((h, i) => (
              <Bar key={i} h={h} />
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <div className="text-sm font-medium">Top sources</div>
          <ul className="mt-4 space-y-3">
            {[
              ["Organic search", 62],
              ["Direct", 24],
              ["Referral", 9],
              ["Paid", 5],
            ].map(([n, p]) => (
              <li key={n as string}>
                <div className="flex items-center justify-between text-sm">
                  <span>{n}</span><span className="font-mono text-muted-foreground">{p}%</span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${p}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div>
            <div className="text-sm font-medium">Recent customers</div>
            <div className="text-xs text-muted-foreground">Last 24 hours</div>
          </div>
          <Button size="sm" variant="ghost">View all <ArrowUpRight className="h-4 w-4" /></Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">MRR</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {RECENT.map(([c, p, s, m]) => (
              <TableRow key={c}>
                <TableCell className="font-medium">{c}</TableCell>
                <TableCell>{p}</TableCell>
                <TableCell>
                  <Badge variant={s === "Active" ? "secondary" : s === "Past due" ? "destructive" : "outline"}>{s}</Badge>
                </TableCell>
                <TableCell className="text-right font-mono">{m}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
