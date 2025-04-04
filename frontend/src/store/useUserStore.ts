import { TUserStore } from "@/types/user.types";
import { createStoragePersist } from "@/utils/persistStore";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create<TUserStore>()(
  persist(
    (set, _get) => ({
      user: null,
      setUser: (data) => {
        set({ user: data });
      },
    }),
    {
      name: "auth-store",
      storage: createStoragePersist<TUserStore>(),
    }
  )
);
