import type { ThemeTokens, VisualMode } from "./tokens";
import { DEFAULT_TOKENS } from "./tokens";

export const MODE_PRESETS: Record<VisualMode, Partial<ThemeTokens>> = {
  light: { mode: "light", radius: 0.75, elevation: 1 },
  dark: { mode: "dark", radius: 0.75, elevation: 1.2 },
  glass: { mode: "glass", radius: 1, elevation: 1.4 },
  neumorphic: { mode: "neumorphic", radius: 1.25, elevation: 1, primary: "#6366F1" },
  soft: { mode: "soft", radius: 1.25, elevation: 0.8, primary: "#7C3AED" },
  minimal: { mode: "minimal", radius: 0.25, elevation: 0.3, primary: "#111827" },
  luxury: { mode: "luxury", radius: 0.5, elevation: 1.6, primary: "#D4A857" },
  enterprise: { mode: "enterprise", radius: 0.375, elevation: 0.8, primary: "#1E40AF" },
};

export function applyModePreset(tokens: ThemeTokens, mode: VisualMode): ThemeTokens {
  return { ...tokens, ...MODE_PRESETS[mode] };
}

export const THEME_VARIANTS = [
  { id: "corporate", name: "Corporate", primary: "#2563EB", accent: "#DBEAFE" },
  { id: "startup", name: "Startup", primary: "#7C3AED", accent: "#EDE9FE" },
  { id: "agency", name: "Agency", primary: "#EC4899", accent: "#FCE7F3" },
  { id: "medical", name: "Medical", primary: "#0EA5E9", accent: "#E0F2FE" },
  { id: "fitness", name: "Fitness", primary: "#F97316", accent: "#FFEDD5" },
  { id: "education", name: "Education", primary: "#0891B2", accent: "#CFFAFE" },
  { id: "real-estate", name: "Real Estate", primary: "#0F766E", accent: "#CCFBF1" },
  { id: "restaurant", name: "Restaurant", primary: "#DC2626", accent: "#FEE2E2" },
  { id: "automotive", name: "Automotive", primary: "#1E293B", accent: "#E2E8F0" },
  { id: "legal", name: "Legal", primary: "#1E3A8A", accent: "#DBEAFE" },
  { id: "finance", name: "Finance", primary: "#065F46", accent: "#D1FAE5" },
  { id: "luxury", name: "Luxury", primary: "#D4A857", accent: "#FEF3C7" },
  { id: "fashion", name: "Fashion", primary: "#831843", accent: "#FCE7F3" },
  { id: "travel", name: "Travel", primary: "#0284C7", accent: "#E0F2FE" },
  { id: "technology", name: "Technology", primary: "#6366F1", accent: "#E0E7FF" },
  { id: "consulting", name: "Consulting", primary: "#334155", accent: "#F1F5F9" },
  { id: "manufacturing", name: "Manufacturing", primary: "#525252", accent: "#F5F5F5" },
  { id: "construction", name: "Construction", primary: "#CA8A04", accent: "#FEF9C3" },
  { id: "ngo", name: "NGO", primary: "#15803D", accent: "#DCFCE7" },
  { id: "personal", name: "Personal Brand", primary: "#9333EA", accent: "#F3E8FF" },
] as const;

export function applyVariant(tokens: ThemeTokens, id: string): ThemeTokens {
  const v = THEME_VARIANTS.find((x) => x.id === id);
  if (!v) return tokens;
  return { ...tokens, primary: v.primary, accent: v.accent };
}

export { DEFAULT_TOKENS };
