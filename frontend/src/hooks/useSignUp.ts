import { SignUpForm } from "@/schemas/signUp";

export const useSignUp = () => {
  const handleOnSubmit = (values: SignUpForm) => {
    console.log("values", values);
  };

  return { handleOnSubmit };
};
