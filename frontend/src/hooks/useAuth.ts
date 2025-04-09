import { API } from "@/constants/api";
import { END_POINT } from "@/constants/endpoint";
import DATA from "@/constants/notFound";
import { ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";
import { TApiError } from "@/types/api.types";
import {
  TAuthUser,
  TSignInForm,
  TSignUpForm,
  TSignUpFormData,
} from "@/types/auth.types";
import { generateAvatar } from "@/utils";
import { getApiError } from "@/utils";
import DOMPurify from "dompurify";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export const useAuth = () => {
  const { authenticate, logOut } = useAuthStore();
  const { resetData } = useChatStore();

  const navigate = useNavigate();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const sendSignUp = async (values: TSignUpForm) => {
    try {
      setIsSigningUp(true);
      const sanitizeData: TSignUpFormData & { profilePic: string } = {
        email: DOMPurify.sanitize(values.email),
        firstName: DOMPurify.sanitize(values.firstName),
        lastName: DOMPurify.sanitize(values.lastName),
        password: DOMPurify.sanitize(values.password),
        username: DOMPurify.sanitize(values.username),
        profilePic: generateAvatar(values.firstName, values.lastName),
      };
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${END_POINT.SIGN_UP}`,
        {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify(sanitizeData),
        }
      );
      console.log("response", await response.json());
      if (!response.ok) {
        const errorData: TApiError = await response.json();
        throw errorData;
      }
      toast.success(API.ACCOUNT_CREATED);
      navigate(ROUTES.SIGN_IN);
    } catch (error: unknown) {
      toast.error(getApiError(error) ?? DATA.API_ERROR);
    } finally {
      setIsSigningUp(false);
    }
  };

  const sendSignIn = async (values: TSignInForm) => {
    try {
      setIsSigningIn(true);
      const sanitizeData: TSignInForm = {
        email: DOMPurify.sanitize(values.email),
        password: DOMPurify.sanitize(values.password),
      };
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${END_POINT.SIGN_IN}`,
        {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify(sanitizeData),
        }
      );
      if (!response.ok) {
        const errorData: TApiError = await response.json();
        throw errorData;
      }
      const authData = (await response.json()) as TAuthUser;
      authenticate(authData);
      toast.success(`${API.WELCOME} ${authData.username}`);
      navigate(ROUTES.CHAT);
    } catch (error: unknown) {
      toast.error(getApiError(error) ?? DATA.API_ERROR);
    } finally {
      setIsSigningIn(false);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${END_POINT.LOGOUT}`,
        { method: "POST" }
      );
      if (!response.ok) {
        const errorData: TApiError = await response.json();
        throw errorData;
      }
      resetData();
      logOut();
      toast.success(API.LOGOUT);
    } catch (error: unknown) {
      toast.error(getApiError(error) ?? DATA.API_ERROR);
    }
  };

  return { sendSignUp, sendSignIn, logout, isSigningIn, isSigningUp };
};
