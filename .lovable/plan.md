# BusinessOS Pro — v1 Design Deliverable

A navigable, high-fidelity **design showcase** built in this Lovable project. No Next.js code is produced — instead, the design system, tokens, components, Theme Builder UX, and one full demo theme are implemented as production-quality React/Tailwind screens that your team can port to Next.js verbatim (tokens, markup, and Tailwind classes transfer 1:1).

Scope is intentionally bounded to what we agreed in v1: **design system + Theme Builder + one demo theme (Corporate)**. Other modules (Ecommerce, CRM, Customer Portal, Forms Builder, Admin, the other 19 theme variants) are explicitly **out of scope** and reserved for follow-up plans.

---

## What you get

A single running app at `/` with a left-side showcase nav and these top-level sections:

1. **Overview** — product positioning, design principles, what's included.
2. **Foundations** — tokens (color, type, spacing, radius, shadow, motion), accessibility rules, visual modes.
3. **Components** — atomic library: buttons, inputs, selects, checkboxes, radios, switches, sliders, tabs, accordions, dialogs, drawers, sheets, tooltips, popovers, dropdowns, breadcrumbs, pagination, badges, alerts, toasts, avatars, cards, tables, empty states, skeletons, form layouts.
4. **Patterns** — page-level compositions: navbars, hero sections, pricing tables, FAQ, testimonials, feature grids, footers, auth screens, dashboard shells, data tables, chart cards, settings layouts, empty/loading/error states.
5. **Theme Builder** — live, interactive editor (primary/secondary/accent, neutrals, typography pairing, radius scale, spacing density, shadow elevation, motion level, light/dark/glass/neumorphic/soft/minimal/luxury/enterprise mode). Real preview pane + export/import JSON.
6. **Corporate Demo** — full marketing site + dashboard rendered with the active theme tokens, so editing in Theme Builder visibly restyles the entire demo. Marketing: landing, pricing, features, about, contact. Dashboard: shell with sidebar, top bar, overview/analytics page, settings.
7. **Handoff** — token JSON, component inventory, accessibility spec, naming conventions, porting notes for Next.js App Router.

---

## Design system

Tokens live in `src/styles.css` under `@theme` and are wired through shadcn's `@theme inline` mapping so every component reads from CSS variables.

- **Color**: brand primary `#2563EB`, success `#16A34A`, warning `#F59E0B`, danger `#DC2626`, info `#0EA5E9`, neutral `#111827`, surface/background light + dark per brief. Defined in OKLCH for accurate dark-mode derivation.
- **Spacing**: 4 / 8 / 12 / 16 / 24 / 32 / 40 / 48 / 64 / 80 / 96.
- **Radius**: 4 / 8 / 12 / 16 / 20 / 24.
- **Type**: Inter (headings), Plus Jakarta Sans (alt), JetBrains Mono (code). Scale 12 → 72. Loaded via `<link>` in `__root.tsx` head.
- **Shadow**: 6-step elevation system (xs → 2xl) using `color-mix` against primary for tinted shadows.
- **Motion**: 4 tiers (none / subtle / standard / expressive) gated by `prefers-reduced-motion`.

## Theme Builder UX

- Split view: controls left (320px), live preview right (rendered fragments of the Corporate demo — hero, pricing card, dashboard widget, form).
- Controls grouped: Brand colors · Neutrals · Typography · Radius · Spacing density · Shadow elevation · Motion · Visual mode.
- All edits write to CSS variables on `:root` in real time — no rebuild, no flash.
- Export → downloads `theme.json`; Import → file picker; Reset → restores defaults.
- Mode toggle (Light / Dark / Glass / Neumorphic / Soft / Minimal / Luxury / Enterprise) swaps a token preset.

## Corporate demo theme

A full reference site rendered entirely from tokens, so it doubles as proof the Theme Builder works:

- Marketing routes: `/demo`, `/demo/pricing`, `/demo/features`, `/demo/about`, `/demo/contact`.
- App routes (static, no auth): `/demo/app` (dashboard shell), `/demo/app/analytics`, `/demo/app/settings`.
- Each marketing page has unique `head()` title + meta description + og tags per TanStack route conventions.

## Accessibility

- WCAG 2.2 AA contrast verified on every token pairing (light + dark).
- All interactive elements are shadcn/Radix primitives — keyboard nav, focus rings, ARIA correct by default.
- Single `<main>` per route, skip-to-content link in `__root.tsx`, `prefers-reduced-motion` respected, 44×44 minimum tap targets on mobile.

## Responsive

Mobile-first. Breakpoints: 360 / 640 / 768 / 1024 / 1280 / 1536. Every showcase page reviewed at mobile and desktop viewports before delivery.

---

## Technical section (for your developers)

```text
src/
  routes/
    __root.tsx                      sidebar shell, theme provider, font links
    index.tsx                       Overview
    foundations.tsx                 tokens reference
    components.tsx                  component gallery
    patterns.tsx                    page-level patterns
    theme-builder.tsx               live editor + preview
    handoff.tsx                     export tokens, porting notes
    demo.tsx                        marketing layout (Outlet)
    demo.index.tsx                  landing
    demo.pricing.tsx
    demo.features.tsx
    demo.about.tsx
    demo.contact.tsx
    demo.app.tsx                    dashboard shell (Outlet)
    demo.app.index.tsx              overview
    demo.app.analytics.tsx
    demo.app.settings.tsx
  components/
    showcase/                       nav, swatch, type-specimen, token-table
    theme-builder/                  controls, preview, export/import
    demo/                           marketing + dashboard sections
    ui/                             existing shadcn (already present)
  lib/
    theme/
      tokens.ts                     default token object (typed)
      presets.ts                    8 visual-mode presets
      apply.ts                      writes CSS vars to :root
      store.ts                      Zustand store for live theme state
  styles.css                        @theme + @theme inline + shadcn tokens
```

- **State**: Zustand for theme state only. No React Query needed (no data fetching).
- **Persistence**: theme persisted to `localStorage` so refresh keeps edits.
- **No backend**: Lovable Cloud is **not** enabled in v1. Auth + Stripe are deferred to the next plan once a backend module (Customer Portal, Ecommerce, or Admin) is in scope.
- **Porting note**: every token, class, and component is framework-agnostic. To move to Next.js App Router, copy `src/styles.css`, `src/lib/theme/*`, `src/components/ui/*`, and `src/components/demo/*` into a Next.js project; replace TanStack route files with App Router `page.tsx` equivalents.

---

## Explicitly out of scope for v1

Ecommerce, Customer Portal, CRM, Forms Builder, Custom Fields Builder, Analytics with live charts, Admin Dashboard with RBAC, the other 19 theme variants, i18n wiring, GA/GTM/Pixel/Clarity scripts, Resend/Sendgrid, Hubspot/Salesforce/Zoho, n8n/Zapier/Make, Contentlayer/Sanity, Docker/AWS deployment guides. Each is a credible follow-up plan once v1 lands.

## Deliverable checklist

- [ ] Tokens defined in `styles.css` and surfaced in Foundations page
- [ ] Component gallery covering the atomic list above
- [ ] Pattern gallery covering navbars, hero, pricing, FAQ, testimonials, footer, auth, dashboard shell, data table, charts, empty/loading/error
- [ ] Theme Builder with live preview, 8 mode presets, JSON export/import, localStorage persistence
- [ ] Corporate demo: 5 marketing pages + 3 dashboard pages, all token-driven
- [ ] Mobile + desktop QA pass on every showcase route
- [ ] Handoff page with token JSON download and Next.js porting notes

Ready to build on approval.
