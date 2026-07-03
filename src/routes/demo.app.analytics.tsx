import { createFileRoute } from "@tanstack/react-router";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/demo/app/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — Northwind Dashboard" },
      { name: "description", content: "Realtime revenue, traffic, and conversion analytics." },
    ],
  }),
  component: Analytics,
});

const COHORTS = [
  ["Jan", 100, 84, 72, 65, 58, 54],
  ["Feb", 100, 88, 78, 70, 64, 60],
  ["Mar", 100, 90, 82, 76, 70, 0],
  ["Apr", 100, 86, 78, 72, 0, 0],
  ["May", 100, 91, 84, 0, 0, 0],
  ["Jun", 100, 92, 0, 0, 0, 0],
];

function heatColor(v: number) {
  if (!v) return "bg-muted text-muted-foreground";
  if (v >= 85) return "bg-primary text-primary-foreground";
  if (v >= 70) return "bg-primary/70 text-primary-foreground";
  if (v >= 55) return "bg-primary/45 text-foreground";
  return "bg-primary/20 text-foreground";
}

function Analytics() {
  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-semibold tracking-tight">Analytics</h1>
        <p className="text-sm text-muted-foreground">Cohort retention, channels, and conversion funnels.</p>
      </div>

      <Tabs defaultValue="cohorts">
        <TabsList>
          <TabsTrigger value="cohorts">Cohorts</TabsTrigger>
          <TabsTrigger value="funnel">Funnel</TabsTrigger>
          <TabsTrigger value="channels">Channels</TabsTrigger>
        </TabsList>

        <TabsContent value="cohorts" className="pt-4">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-sm font-medium">Customer retention by signup month</div>
                <div className="text-xs text-muted-foreground">% of cohort active in each subsequent month</div>
              </div>
              <Badge variant="outline">Last 6 months</Badge>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-muted-foreground">
                    <th className="text-left font-medium pb-2">Cohort</th>
                    {["M0","M1","M2","M3","M4","M5"].map((m) => (
                      <th key={m} className="text-center font-medium pb-2">{m}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COHORTS.map((row) => (
                    <tr key={row[0] as string}>
                      <td className="py-1 pr-3 font-medium">{row[0]}</td>
                      {(row.slice(1) as number[]).map((v, i) => (
                        <td key={i} className="p-1">
                          <div className={`h-9 rounded-md grid place-items-center font-mono ${heatColor(v)}`}>
                            {v ? `${v}%` : "·"}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="funnel" className="pt-4">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="text-sm font-medium mb-4">Acquisition funnel</div>
            {[
              ["Visited site", 100, "48,210"],
              ["Started signup", 38, "18,320"],
              ["Created workspace", 24, "11,570"],
              ["Activated", 14, "6,748"],
              ["Paid", 4.8, "2,314"],
            ].map(([n, p, v]) => (
              <div key={n as string} className="mb-3 last:mb-0">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="font-medium">{n}</span>
                  <span className="text-muted-foreground font-mono">{v} · {p}%</span>
                </div>
                <div className="h-7 rounded-md bg-muted overflow-hidden">
                  <div className="h-full gradient-brand" style={{ width: `${p as number}%` }} />
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="channels" className="pt-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Organic", "$62,420", "+18%"],
              ["Direct", "$48,210", "+9%"],
              ["Referral", "$22,940", "+24%"],
              ["Paid", "$12,640", "-4%"],
            ].map(([n, v, d]) => (
              <div key={n} className="rounded-xl border border-border bg-card p-5">
                <div className="text-xs text-muted-foreground">{n}</div>
                <div className="mt-1 font-display text-2xl font-semibold">{v}</div>
                <div className={`mt-1 text-xs ${d.startsWith("-") ? "text-destructive" : "text-[color:var(--success)]"}`}>{d}</div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
