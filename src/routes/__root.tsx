import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { useThemeStore } from "../lib/theme/store";
import {
  Boxes,
  LayoutDashboard,
  Layers,
  Palette,
  Sparkles,
  FileCode2,
  Component,
  Building2,
} from "lucide-react";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "BusinessOS Pro — Enterprise SaaS & Commerce Design System" },
      {
        name: "description",
        content:
          "BusinessOS Pro is a premium, accessible, enterprise-ready design system, component library, and live Theme Builder for SaaS and commerce products.",
      },
      { name: "author", content: "BusinessOS" },
      { property: "og:title", content: "BusinessOS Pro" },
      {
        property: "og:description",
        content:
          "Premium enterprise SaaS + Commerce design system with a live Theme Builder.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        <a href="#main" className="skip-link">Skip to content</a>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function ThemeBoot() {
  const apply = useThemeStore((s) => s.apply);
  useEffect(() => { apply(); }, [apply]);
  return null;
}

const NAV = [
  { to: "/", label: "Overview", icon: LayoutDashboard },
  { to: "/foundations", label: "Foundations", icon: Layers },
  { to: "/components", label: "Components", icon: Component },
  { to: "/patterns", label: "Patterns", icon: Boxes },
  { to: "/theme-builder", label: "Theme Builder", icon: Palette },
  { to: "/handoff", label: "Handoff", icon: FileCode2 },
] as const;

const DEMO_NAV = [
  { to: "/demo", label: "Marketing site", icon: Sparkles },
  { to: "/demo/app", label: "Dashboard", icon: Building2 },
] as const;

function ShowcaseShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const inDemo = pathname.startsWith("/demo");
  if (inDemo) return <>{children}</>;

  return (
    <div className="flex min-h-dvh bg-background text-foreground">
      <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-border bg-sidebar text-sidebar-foreground">
        <div className="flex items-center gap-2 px-5 h-16 border-b border-sidebar-border">
          <div className="h-8 w-8 rounded-md gradient-brand grid place-items-center text-white shadow-md">
            <span className="font-bold text-sm">B</span>
          </div>
          <div className="leading-tight">
            <div className="font-semibold text-sm">BusinessOS</div>
            <div className="text-[11px] text-muted-foreground">Pro · v1.0</div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-6">
          <div>
            <div className="px-2 pb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Design system
            </div>
            <ul className="space-y-0.5">
              {NAV.map((n) => {
                const active =
                  n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
                const Icon = n.icon;
                return (
                  <li key={n.to}>
                    <Link
                      to={n.to}
                      className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors ${
                        active
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/60"
                      }`}
                    >
                      <Icon className="h-4 w-4 opacity-80" />
                      {n.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <div className="px-2 pb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Live theme
            </div>
            <ul className="space-y-0.5">
              {DEMO_NAV.map((n) => {
                const Icon = n.icon;
                return (
                  <li key={n.to}>
                    <Link
                      to={n.to}
                      className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent/60"
                    >
                      <Icon className="h-4 w-4 opacity-80" />
                      {n.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        <div className="p-3 border-t border-sidebar-border text-[11px] text-muted-foreground">
          WCAG 2.2 AA · Mobile-first · Token-driven
        </div>
      </aside>

      <main id="main" className="flex-1 min-w-0">
        {children}
      </main>
    </div>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeBoot />
      <ShowcaseShell>
        <Outlet />
      </ShowcaseShell>
    </QueryClientProvider>
  );
}
