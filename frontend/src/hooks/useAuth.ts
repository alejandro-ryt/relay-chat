import { useAuthStore } from "@/store/useAuthStore";
import DOMPurify from "dompurify";
import { TSignUpForm, TSignInForm } from "@/types/auth.types";
import { useNavigate } from "react-router";
import { ROUTES } from "@/constants/routes";
import toast from "react-hot-toast";

export const useAuth = () => {
  const { signUp, signIn } = useAuthStore();
  const navigate = useNavigate();

  const sendSignUp = async (values: TSignUpForm) => {
    const isCreated = await signUp({
      email: DOMPurify.sanitize(values.email),
      firstName: DOMPurify.sanitize(values.firstName),
      lastName: DOMPurify.sanitize(values.lastName),
      password: DOMPurify.sanitize(values.password),
      username: DOMPurify.sanitize(values.username),
    });
    if (isCreated) {
      toast.success("Account Created!");
      navigate(ROUTES.SIGN_IN);
    }
  };

  const sendSignIn = async (values: TSignInForm) => {
    const isAuthenticated = await signIn({
      email: DOMPurify.sanitize(values.email),
      password: DOMPurify.sanitize(values.password),
    });
    if (isAuthenticated) {
      toast.success("Welcome");
      navigate(ROUTES.CHAT);
    }
  };

  return { sendSignUp, sendSignIn };
};
