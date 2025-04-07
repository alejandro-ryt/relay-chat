import { TThemesActions, TThemesState } from "@/types/theme.types";
import { create } from "zustand";

export const useThemeStore = create<TThemesState & TThemesActions>((set) => ({
  theme: localStorage.getItem("chat-theme") || "sunset",
  setTheme: (theme: string | Storage) => {
    localStorage.setItem("chat-theme", String(theme));
    set({ theme });
  },
}));
