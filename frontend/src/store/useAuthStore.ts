import { TAuthStore } from "@/types/auth.types";
import toast from "react-hot-toast";
import { create } from "zustand";
import { persist, PersistStorage, StorageValue } from "zustand/middleware";
import { END_POINT } from "@/constants/endpoint";
import { TApiError } from "@/types/api.types";
import { getApiError } from "@/utils/errors";

const storage: PersistStorage<TAuthStore> = {
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

export const useAuthStore = create<TAuthStore>()(
  persist(
    (set, get) => ({
      authUser: null,
      socket: null,
      isAuthenticated: false,
      isSigningUp: false,
      isSigningIn: false,
      signIn: async (data) => {
        set({ isSigningIn: true });
        try {
          const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}${END_POINT.SIGN_IN}`,
            {
              headers: { "Content-Type": "application/json" },
              method: "POST",
              body: JSON.stringify(data),
            }
          );
          if (!response.ok) {
            const errorData: TApiError = await response.json();
            throw errorData;
          }
          set({
            authUser: { userId: "1", username: "test" },
            isAuthenticated: true,
          });
          return true;
        } catch (error) {
          toast.error(getApiError(error));
          return false;
        } finally {
          set({ isSigningIn: false });
        }
      },
      signUp: async (data) => {
        set({ isSigningUp: true });
        try {
          const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}${END_POINT.SIGN_UP}`,
            {
              headers: { "Content-Type": "application/json" },
              method: "POST",
              body: JSON.stringify(data),
            }
          );
          if (!response.ok) {
            const errorData: TApiError = await response.json();
            throw errorData;
          }
          return true;
        } catch (error: unknown) {
          toast.error(getApiError(error));
          return false;
        } finally {
          set({ isSigningUp: false });
        }
      },
      logOut: async () => {
        try {
          console.log("Log out");
        } catch (error) {
          toast.error("signIn", error ?? "");
        }
      },
    }),
    {
      name: "auth-store",
      storage: storage,
    }
  )
);
