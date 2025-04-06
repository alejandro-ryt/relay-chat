import { TAuthStore } from "@/types/auth.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createStoragePersist } from "@/utils/persistStore";
import socket from "@/socket/socket";

export const useAuthStore = create<TAuthStore>()(
  persist(
    (set, get) => ({
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
      socketConnection: () => {
        const { authUser } = get();
        console.log("socket", get().socket?.active);
        if (!authUser || get().socket?.connected) return;
        const socket = io(import.meta.env.VITE_WS_URL);
        console.log("socket", socket);
        socket.connect();
        socket.on("connect", () => {
          console.log("Socket connected successfully");
          console.log("socket", socket);
          set({ socket: socket });
          console.log("socket status:", get().socket?.connected); // Log after setting
          socket.emit("initiateSocket", authUser.userId);
        });
        console.log("auth", authUser.userId);
        socket.emit("initiateSocket", get().authUser?.userId);
        set({ socket: socket });
      },
    }),
    {
      name: "auth-store",
      storage: createStoragePersist<TAuthStore>(),
    }
  )
);
