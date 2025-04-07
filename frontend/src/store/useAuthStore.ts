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
      authUserContact: [],
      isAuthenticated: false,
      authenticate: (data) => {
        socket?.connect();
        set({ authUser: data, isAuthenticated: true });
      },
      setAuthUserDetails: (data) => {
        set({ authUserDetails: data });
        set({ authUserContact: data.contacts });
      },
      filterContacts: (searchTerm) => {
        const authUser = get().authUserDetails;
        if (!authUser || !authUser) {
          return [];
        }

        const lowerSearchTerm = searchTerm.toLowerCase();

        return authUser.contacts.filter((userContact) => {
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
      },
    }),
    {
      name: "auth-store",
      storage: createStoragePersist<TAuthStore>(),
    }
  )
);
