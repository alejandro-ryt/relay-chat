import { TAuthStore } from "@/types/auth.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createStoragePersist } from "@/utils/persistStore";

export const useAuthStore = create<TAuthStore>()(
  persist(
    (set, _get) => ({
      socket: null,
      authUser: null,
      authUserDetails: null,
      isAuthenticated: false,
      authenticate: (data) => {
        set({ authUser: data, isAuthenticated: true });
      },
      setAuthUserDetails: (data) => {
        set({ authUserDetails: data });
      },
      logOut: () => {
        set({ authUser: null, isAuthenticated: false });
        set({ authUserDetails: null });
      },
    }),
    {
      name: "auth-store",
      storage: createStoragePersist<TAuthStore>(),
    }
  )
);
