import { SignUpFormData, SignInFormData } from "@/types/auth.types";
import toast from "react-hot-toast";
import { create } from "zustand";
import { Socket } from "socket.io-client";

type TAuthStore = {
  authUser: TAuthUser | null;
  socket: null | Socket;
  signIn: (data: SignInFormData) => void;
  signUp: (data: SignUpFormData) => void;
  logOut: () => void;
};

type TAuthUser = {
  name: string;
};

export const useAuthStore = create<TAuthStore>((set, get) => ({
  authUser: null,
  socket: null,
  signIn: async (data) => {
    try {
      console.log(data);
    } catch (error) {
      toast.error("signIn", error ?? "");
    }
  },
  signUp: async (data) => {
    try {
      console.log(data);
    } catch (error) {
      toast.error("signIn", error ?? "");
    }
  },
  logOut: async () => {
    try {
      console.log("Log out");
    } catch (error) {
      toast.error("signIn", error ?? "");
    }
  },
}));
