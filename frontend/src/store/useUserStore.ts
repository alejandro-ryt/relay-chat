import { TUserStore } from "@/types/user.types";
import { createStoragePersist } from "@/utils/persistStore";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create<TUserStore>()(
  persist(
    (set, _get) => ({
      users: [],
      setUsers: (data) => {
        set({ users: data });
      },
    }),
    {
      name: "auth-store",
      storage: createStoragePersist<TUserStore>(),
    }
  )
);
