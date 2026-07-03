import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [
      { title: "Northwind — Operations Platform for Modern Teams" },
      { name: "description", content: "Northwind unifies sales, ops, and customer success in one premium platform." },
      { property: "og:title", content: "Northwind — Operations Platform" },
      { property: "og:description", content: "One platform for sales, ops, and CS — built for modern teams." },
    ],
  }),
  component: DemoLayout,
});

const LINKS = [
  { to: "/demo", label: "Home", exact: true },
  { to: "/demo/features", label: "Features", exact: false },
  { to: "/demo/pricing", label: "Pricing", exact: false },
  { to: "/demo/about", label: "About", exact: false },
  { to: "/demo/contact", label: "Contact", exact: false },
] as const;

function DemoLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const inApp = pathname.startsWith("/demo/app");
  if (inApp) return <Outlet />;

  const [open, setOpen] = useState(false);

  const isActive = (to: string, exact?: boolean) =>
    exact ? pathname === to : pathname === to || pathname.startsWith(to + "/");

  return (
    <div className="min-h-dvh flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between gap-4">
          <Link to="/demo" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md gradient-brand grid place-items-center text-white font-bold">N</div>
            <span className="font-display font-semibold">Northwind</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`px-3 py-1.5 rounded-md text-sm ${
                  isActive(l.to, l.exact)
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-2">
            <Link to="/demo/app" className="text-sm text-muted-foreground hover:text-foreground px-3 py-1.5">Sign in</Link>
            <Link to="/demo/app" className="rounded-md bg-primary px-3.5 py-1.5 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-95">
              Start free
            </Link>
          </div>
          <button
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-border"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <div className="md:hidden border-t border-border px-6 py-3 space-y-1 bg-background">
            {LINKS.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block py-2 text-sm">{l.label}</Link>
            ))}
            <Link to="/demo/app" onClick={() => setOpen(false)} className="block py-2 text-sm font-medium text-primary">Start free →</Link>
          </div>
        )}
      </header>

      <main id="main" className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border bg-card/40">
        <div className="mx-auto max-w-6xl px-6 py-10 grid gap-8 md:grid-cols-4 text-sm">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-md gradient-brand grid place-items-center text-white font-bold text-xs">N</div>
              <span className="font-display font-semibold">Northwind</span>
            </div>
            <p className="mt-2 text-muted-foreground">Operations platform for modern teams.</p>
          </div>
          <div>
            <div className="font-medium mb-2">Product</div>
            <ul className="space-y-1 text-muted-foreground">
              <li><Link to="/demo/features">Features</Link></li>
              <li><Link to="/demo/pricing">Pricing</Link></li>
              <li><Link to="/demo/app">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-medium mb-2">Company</div>
            <ul className="space-y-1 text-muted-foreground">
              <li><Link to="/demo/about">About</Link></li>
              <li><Link to="/demo/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-medium mb-2">Built with</div>
            <ul className="space-y-1 text-muted-foreground">
              <li><Link to="/">BusinessOS Pro</Link></li>
              <li><Link to="/theme-builder">Theme Builder</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Northwind · Demo theme by BusinessOS Pro
        </div>
      </footer>
    </div>
  );
}
