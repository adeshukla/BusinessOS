import { DEFAULT_TOKENS, TYPOGRAPHY_PAIRS, type ThemeTokens, type VisualMode } from "./tokens";

/** Convert hex to OKLCH string (approximate, perceptually adequate). */
function hexToOklch(hex: string): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  // sRGB -> linear
  const lin = (c: number) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  const R = lin(r), G = lin(g), B = lin(b);
  // linear sRGB -> OKLab (Björn Ottosson)
  const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
  const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
  const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const Bv = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  const C = Math.sqrt(A * A + Bv * Bv);
  let H = (Math.atan2(Bv, A) * 180) / Math.PI;
  if (H < 0) H += 360;
  return `oklch(${L.toFixed(3)} ${C.toFixed(3)} ${H.toFixed(1)})`;
}

/** Pick a foreground (white/near-black) for a hex bg with WCAG-ish heuristic. */
function readableFg(hex: string): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 150 ? "oklch(0.18 0.04 264)" : "oklch(0.99 0.005 250)";
}

const MODE_CLASSES: VisualMode[] = [
  "light",
  "dark",
  "glass",
  "neumorphic",
  "soft",
  "minimal",
  "luxury",
  "enterprise",
];

export function applyTheme(tokens: ThemeTokens) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;

  // Mode classes — dark is its own toggle, the rest are overlays.
  root.classList.remove("dark");
  MODE_CLASSES.forEach((m) => root.classList.remove(`mode-${m}`));
  if (tokens.mode === "dark") {
    root.classList.add("dark");
  } else if (tokens.mode !== "light") {
    root.classList.add(`mode-${tokens.mode}`);
    // luxury implies dark base
    if (tokens.mode === "luxury") root.classList.add("dark");
  }

  // Density
  ["density-compact", "density-cozy", "density-comfortable"].forEach((c) =>
    root.classList.remove(c),
  );
  root.classList.add(`density-${tokens.density}`);

  // Motion
  ["motion-none", "motion-subtle", "motion-standard", "motion-expressive"].forEach((c) =>
    root.classList.remove(c),
  );
  root.classList.add(`motion-${tokens.motion}`);

  // Colors
  root.style.setProperty("--primary", hexToOklch(tokens.primary));
  root.style.setProperty("--primary-foreground", readableFg(tokens.primary));
  root.style.setProperty("--ring", hexToOklch(tokens.primary));
  root.style.setProperty("--accent", hexToOklch(tokens.accent));
  root.style.setProperty("--accent-foreground", readableFg(tokens.accent));
  root.style.setProperty("--secondary", hexToOklch(tokens.secondary));
  root.style.setProperty("--secondary-foreground", readableFg(tokens.secondary));
  root.style.setProperty("--destructive", hexToOklch(tokens.danger));
  root.style.setProperty("--destructive-foreground", readableFg(tokens.danger));
  root.style.setProperty("--success", hexToOklch(tokens.success));
  root.style.setProperty("--success-foreground", readableFg(tokens.success));
  root.style.setProperty("--warning", hexToOklch(tokens.warning));
  root.style.setProperty("--warning-foreground", readableFg(tokens.warning));
  root.style.setProperty("--info", hexToOklch(tokens.info));
  root.style.setProperty("--info-foreground", readableFg(tokens.info));
  root.style.setProperty("--chart-1", hexToOklch(tokens.primary));
  root.style.setProperty("--chart-2", hexToOklch(tokens.success));
  root.style.setProperty("--chart-3", hexToOklch(tokens.warning));
  root.style.setProperty("--chart-4", hexToOklch(tokens.info));
  root.style.setProperty("--chart-5", hexToOklch(tokens.danger));

  // Radius
  root.style.setProperty("--radius", `${tokens.radius}rem`);

  // Typography
  const pair = TYPOGRAPHY_PAIRS.find((p) => p.id === tokens.typography) ?? TYPOGRAPHY_PAIRS[0];
  root.style.setProperty("--font-heading", `"${pair.heading}"`);
  root.style.setProperty("--font-body", `"${pair.body}"`);
  root.style.setProperty("--font-code", `"${pair.code}"`);
  ensureFontLink(pair.googleFamilies);

  // Elevation multiplier
  const e = tokens.elevation;
  root.style.setProperty(
    "--elev-xs",
    `0 ${1 * e}px ${2 * e}px 0 color-mix(in oklab, var(--primary) ${8 * e}%, transparent)`,
  );
  root.style.setProperty(
    "--elev-sm",
    `0 ${2 * e}px ${4 * e}px -1px color-mix(in oklab, var(--primary) ${10 * e}%, transparent)`,
  );
  root.style.setProperty(
    "--elev-md",
    `0 ${4 * e}px ${12 * e}px -2px color-mix(in oklab, var(--primary) ${12 * e}%, transparent)`,
  );
  root.style.setProperty(
    "--elev-lg",
    `0 ${10 * e}px ${24 * e}px -6px color-mix(in oklab, var(--primary) ${18 * e}%, transparent)`,
  );
  root.style.setProperty(
    "--elev-xl",
    `0 ${18 * e}px ${40 * e}px -10px color-mix(in oklab, var(--primary) ${22 * e}%, transparent)`,
  );
  root.style.setProperty(
    "--elev-2xl",
    `0 ${30 * e}px ${60 * e}px -16px color-mix(in oklab, var(--primary) ${28 * e}%, transparent)`,
  );
}

let lastFontKey = "";
function ensureFontLink(families: string[]) {
  if (typeof document === "undefined") return;
  const key = families.join("|");
  if (key === lastFontKey) return;
  lastFontKey = key;
  const id = "businessos-fonts";
  let link = document.getElementById(id) as HTMLLinkElement | null;
  const href =
    "https://fonts.googleapis.com/css2?" +
    families.map((f) => `family=${f}`).join("&") +
    "&display=swap";
  if (!link) {
    link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    document.head.appendChild(link);
    // Preconnect once
    const pc1 = document.createElement("link");
    pc1.rel = "preconnect";
    pc1.href = "https://fonts.googleapis.com";
    document.head.appendChild(pc1);
    const pc2 = document.createElement("link");
    pc2.rel = "preconnect";
    pc2.href = "https://fonts.gstatic.com";
    pc2.crossOrigin = "";
    document.head.appendChild(pc2);
  }
  link.href = href;
}

export function resetTheme() {
  applyTheme(DEFAULT_TOKENS);
}
