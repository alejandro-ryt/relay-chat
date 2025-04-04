import { PersistStorage, StorageValue } from "zustand/middleware";

export const createStoragePersist = <T>(): PersistStorage<T> => ({
  getItem: (
    name: string
  ): StorageValue<T> | Promise<StorageValue<T> | null> | null => {
    const storedValue = localStorage.getItem(name);
    if (storedValue) {
      try {
        return JSON.parse(storedValue) as StorageValue<T>;
      } catch (error) {
        console.error("Error parsing stored data:", error);
        return null;
      }
    }
    return null;
  },
  setItem: (name: string, value: StorageValue<T>): void | Promise<void> => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name: string): void | Promise<void> => {
    localStorage.removeItem(name);
  },
});
