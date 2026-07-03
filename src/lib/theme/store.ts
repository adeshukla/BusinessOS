import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_TOKENS, type ThemeTokens } from "./tokens";
import { applyTheme } from "./apply";

type ThemeState = {
  tokens: ThemeTokens;
  setTokens: (next: Partial<ThemeTokens>) => void;
  replace: (next: ThemeTokens) => void;
  reset: () => void;
  apply: () => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      tokens: DEFAULT_TOKENS,
      setTokens: (next) => {
        const tokens = { ...get().tokens, ...next };
        set({ tokens });
        applyTheme(tokens);
      },
      replace: (tokens) => {
        set({ tokens });
        applyTheme(tokens);
      },
      reset: () => {
        set({ tokens: DEFAULT_TOKENS });
        applyTheme(DEFAULT_TOKENS);
      },
      apply: () => applyTheme(get().tokens),
    }),
    {
      name: "businessos-theme",
      onRehydrateStorage: () => (state) => {
        if (state) queueMicrotask(() => applyTheme(state.tokens));
      },
    },
  ),
);
