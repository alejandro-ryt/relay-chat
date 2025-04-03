import { TAuthStore } from "@/types/auth.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { storagePersistAuth } from "@/utils/persistStore";

export const useAuthStore = create<TAuthStore>()(
  persist(
    (set, get) => ({
      authUser: null,
      socket: null,
      isAuthenticated: false,
      authenticate: (data) => {
        set({ authUser: data, isAuthenticated: true });
      },
      logOut: () => {
        set({ authUser: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-store",
      storage: storagePersistAuth,
    }
  )
);
