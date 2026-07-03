import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  BarChart3,
  Settings,
  Users,
  ShoppingCart,
  FileText,
  Bell,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Route = createFileRoute("/demo/app")({
  head: () => ({
    meta: [
      { title: "Dashboard — Northwind" },
      { name: "description", content: "Operations dashboard built with BusinessOS Pro." },
    ],
  }),
  component: AppShell,
});

const APP_NAV = [
  { to: "/demo/app", icon: LayoutDashboard, label: "Overview", exact: true },
  { to: "/demo/app/analytics", icon: BarChart3, label: "Analytics", exact: false },
  { to: "/demo/app/settings", icon: Settings, label: "Settings", exact: false },
] as const;

const SECONDARY = [
  { icon: Users, label: "Customers" },
  { icon: ShoppingCart, label: "Orders" },
  { icon: FileText, label: "Invoices" },
] as const;

function AppShell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-dvh bg-muted/30">
      <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
        <div className="flex items-center gap-2 px-5 h-16 border-b border-sidebar-border">
          <div className="h-8 w-8 rounded-md gradient-brand grid place-items-center text-white font-bold">N</div>
          <span className="font-display font-semibold">Northwind</span>
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-6">
          <ul className="space-y-0.5">
            {APP_NAV.map((n) => {
              const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
              const Icon = n.icon;
              return (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-sm ${
                      active ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "hover:bg-sidebar-accent/60"
                    }`}
                  >
                    <Icon className="h-4 w-4 opacity-80" />
                    {n.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div>
            <div className="px-2 pb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Workspace</div>
            <ul className="space-y-0.5">
              {SECONDARY.map((s) => {
                const Icon = s.icon;
                return (
                  <li key={s.label}>
                    <button className="w-full flex items-center gap-2.5 rounded-md px-3 py-2 text-sm hover:bg-sidebar-accent/60 text-left">
                      <Icon className="h-4 w-4 opacity-80" />
                      {s.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
        <div className="p-3 border-t border-sidebar-border">
          <div className="flex items-center gap-2 rounded-md px-2 py-2">
            <Avatar className="h-7 w-7"><AvatarFallback>SM</AvatarFallback></Avatar>
            <div className="leading-tight">
              <div className="text-xs font-medium">Sara Mendes</div>
              <div className="text-[10px] text-muted-foreground">Owner</div>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="h-14 border-b border-border bg-background flex items-center gap-3 px-4 md:px-6 sticky top-0 z-20">
          <Link to="/demo" className="md:hidden text-sm text-muted-foreground">← Site</Link>
          <div className="flex-1 max-w-md relative">
            <Search className="h-4 w-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search customers, orders, invoices…" className="pl-8 h-9" />
          </div>
          <button className="relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-border" aria-label="Notifications">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-destructive" />
          </button>
          <Avatar className="h-9 w-9"><AvatarFallback>SM</AvatarFallback></Avatar>
        </header>

        <main id="main" className="flex-1 min-w-0 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
