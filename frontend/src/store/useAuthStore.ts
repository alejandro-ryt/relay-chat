import { TAuthStore } from "@/types/auth.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createStoragePersist } from "@/utils/persistStore";
import socket from "@/socket/socket";

export const useAuthStore = create<TAuthStore>()(
  persist(
    (set, _get) => ({
      authUser: null,
      authUserDetails: null,
      isAuthenticated: false,
      authenticate: (data) => {
        socket?.connect();
        socket?.emit("initiateSocket", data.userId);
        set({ authUser: data, isAuthenticated: true });
      },
      setAuthUserDetails: (data) => {
        set({ authUserDetails: data });
      },
      logOut: () => {
        socket?.disconnect();
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
