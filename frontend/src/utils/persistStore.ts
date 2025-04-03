import { TAuthStore } from "@/types/auth.types";
import { PersistStorage, StorageValue } from "zustand/middleware";

export const storagePersistAuth: PersistStorage<TAuthStore> = {
  getItem: (
    name: string
  ):
    | StorageValue<TAuthStore>
    | Promise<StorageValue<TAuthStore> | null>
    | null => {
    const storedValue = localStorage.getItem(name);
    if (storedValue) {
      try {
        return JSON.parse(storedValue);
      } catch (error) {
        console.error("Error parsing stored data:", error);
        return null;
      }
    }
    return null;
  },
  setItem: (
    name: string,
    value: StorageValue<TAuthStore>
  ): void | Promise<void> => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name: string): void | Promise<void> => {
    localStorage.removeItem(name);
  },
};
