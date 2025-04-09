import { TApiError } from "@/types/api.types";
import { REGEX } from "@/constants/regex";
import { PersistStorage, StorageValue } from "zustand/middleware";
import DATA from "@/constants/notFound";

export const generateAvatar = (firstName: string, lastName: string) =>
  `https://ui-avatars.com/api/?name=${firstName.at(0)}+${lastName.at(0)}`;

export const getApiError = (error: unknown) => {
  if (typeof error === "object" && error !== null) {
    const apiError = error as TApiError;
    return apiError.error;
  }
  return DATA.API_ERROR;
};

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

export const passwordMatch = (password: string, confirmPassword: string) => {
  if (!password || !confirmPassword) {
    return false;
  }

  return (
    password === confirmPassword &&
    REGEX.HAS_ALL_SECURITY.test(password) &&
    REGEX.HAS_ALL_SECURITY.test(confirmPassword)
  );
};
