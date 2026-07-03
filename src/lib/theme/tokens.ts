export type VisualMode =
  | "light"
  | "dark"
  | "glass"
  | "neumorphic"
  | "soft"
  | "minimal"
  | "luxury"
  | "enterprise";

export type Density = "compact" | "cozy" | "comfortable";
export type Motion = "none" | "subtle" | "standard" | "expressive";

export type TypographyPair = {
  id: string;
  label: string;
  heading: string;
  body: string;
  code: string;
  /** Google Fonts CSS2 family params, e.g. "Inter:wght@400;500;600;700" */
  googleFamilies: string[];
};

export const TYPOGRAPHY_PAIRS: TypographyPair[] = [
  {
    id: "inter-jakarta",
    label: "Inter + Plus Jakarta",
    heading: "Inter",
    body: "Plus Jakarta Sans",
    code: "JetBrains Mono",
    googleFamilies: [
      "Inter:wght@400;500;600;700;800",
      "Plus+Jakarta+Sans:wght@400;500;600;700",
      "JetBrains+Mono:wght@400;500;700",
    ],
  },
  {
    id: "jakarta-inter",
    label: "Plus Jakarta + Inter",
    heading: "Plus Jakarta Sans",
    body: "Inter",
    code: "JetBrains Mono",
    googleFamilies: [
      "Plus+Jakarta+Sans:wght@400;500;600;700;800",
      "Inter:wght@400;500;600;700",
      "JetBrains+Mono:wght@400;500;700",
    ],
  },
  {
    id: "sora-inter",
    label: "Sora + Inter",
    heading: "Sora",
    body: "Inter",
    code: "JetBrains Mono",
    googleFamilies: [
      "Sora:wght@400;500;600;700;800",
      "Inter:wght@400;500;600;700",
      "JetBrains+Mono:wght@400;500;700",
    ],
  },
  {
    id: "instrument-inter",
    label: "Instrument Serif + Inter",
    heading: "Instrument Serif",
    body: "Inter",
    code: "JetBrains Mono",
    googleFamilies: [
      "Instrument+Serif:ital@0;1",
      "Inter:wght@400;500;600;700",
      "JetBrains+Mono:wght@400;500;700",
    ],
  },
];

export type ThemeTokens = {
  /** hex */
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
  /** rem */
  radius: number;
  /** typography id */
  typography: string;
  density: Density;
  motion: Motion;
  /** shadow elevation multiplier 0..2 */
  elevation: number;
  mode: VisualMode;
};

export const DEFAULT_TOKENS: ThemeTokens = {
  primary: "#2563EB",
  secondary: "#E2E8F0",
  accent: "#DBEAFE",
  success: "#16A34A",
  warning: "#F59E0B",
  danger: "#DC2626",
  info: "#0EA5E9",
  radius: 0.75,
  typography: "inter-jakarta",
  density: "cozy",
  motion: "standard",
  elevation: 1,
  mode: "light",
};
