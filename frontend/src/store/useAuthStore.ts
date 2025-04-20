import { TAuthStore } from "@/types/auth.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createStoragePersist } from "@/utils";
import socket from "@/socket/socket";

export const useAuthStore = create<TAuthStore>()(
  persist(
    (set, get) => ({
      socket: null,
      authUser: null,
      authUserDetails: null,
      isAuthenticated: false,
      authenticate: (data) => {
        socket?.connect();
        socket.emit("initiateSocket", data.userId);
        set({ authUser: data, isAuthenticated: true });
      },
      setAuthUserDetails: (data) => {
        set({ authUserDetails: data });
      },
      filterContacts: (searchTerm) => {
        const authUserContact = get().authUserDetails?.contacts;
        if (!authUserContact || !authUserContact) {
          return [];
        }

        const lowerSearchTerm = searchTerm.toLowerCase();

        return authUserContact.filter((userContact) => {
          const lowerFirstName = userContact.contact.firstName.toLowerCase();
          const lowerLastName = userContact.contact.lastName.toLowerCase();

          return (
            lowerFirstName.includes(lowerSearchTerm) ||
            lowerLastName.includes(lowerSearchTerm)
          );
        });
      },
      logOut: () => {
        socket?.disconnect();
        set({ authUser: null, isAuthenticated: false });
        set({ authUserDetails: null });
        localStorage.removeItem("auth-store");
      },
    }),
    {
      name: "auth-store",
      storage: createStoragePersist<TAuthStore>(),
    }
  )
);
