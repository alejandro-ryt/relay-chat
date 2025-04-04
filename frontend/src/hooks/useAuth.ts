import { useAuthStore } from "@/store/useAuthStore";
import DOMPurify from "dompurify";
import {
  TSignUpForm,
  TSignInForm,
  TAuthUser,
  TSignUpFormData,
} from "@/types/auth.types";
import { useNavigate } from "react-router";
import { ROUTES } from "@/constants/routes";
import toast from "react-hot-toast";
import { useState } from "react";
import { END_POINT } from "@/constants/endpoint";
import { TApiError } from "@/types/api.types";
import { getApiError } from "@/utils/errors";

export const useAuth = () => {
  const { authenticate, logOut } = useAuthStore();
  const navigate = useNavigate();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const sendSignUp = async (values: TSignUpForm) => {
    try {
      setIsSigningUp(true);
      const sanitizeData: TSignUpFormData = {
        email: DOMPurify.sanitize(values.email),
        firstName: DOMPurify.sanitize(values.firstName),
        lastName: DOMPurify.sanitize(values.lastName),
        password: DOMPurify.sanitize(values.password),
        username: DOMPurify.sanitize(values.username),
      };
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${END_POINT.SIGN_UP}`,
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
      toast.success("Account Created!");
      navigate(ROUTES.SIGN_IN);
    } catch (error: unknown) {
      toast.error(getApiError(error));
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
      toast.success(`Welcome ${authData.username}`);
      navigate(ROUTES.CHAT);
    } catch (error: unknown) {
      toast.error(getApiError(error));
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
      logOut();
      toast.success("Logout Success");
    } catch (error: unknown) {
      toast.error(getApiError(error));
    }
  };

  return { sendSignUp, sendSignIn, logout, isSigningIn, isSigningUp };
};
