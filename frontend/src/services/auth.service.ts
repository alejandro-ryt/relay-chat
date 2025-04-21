import { END_POINT } from "@/constants/endpoint";
import { TApiError } from "@/types/api.types";
import { TAuthUser, TSignInForm, TSignUpBody } from "@/types/auth.types";
import { UseMutationResult, useMutation } from "@tanstack/react-query";

const signUpRequest = async (values: TSignUpBody) => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}${END_POINT.SIGN_UP}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
      credentials: "include",
    }
  );

  if (!response.ok) {
    const errorData: TApiError = await response.json();
    throw errorData;
  }

  return response.ok;
};

const signInRequest = async (values: TSignInForm) => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}${END_POINT.SIGN_IN}`,
    {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(values),
      credentials: "include",
    }
  );
  if (!response.ok) {
    const errorData: TApiError = await response.json();
    throw errorData;
  }

  return (await response.json()) as TAuthUser;
};

const useSignUpMutation = (): UseMutationResult<
  boolean,
  TApiError,
  TSignUpBody
> => {
  return useMutation({ mutationFn: signUpRequest });
};

const useSignInMutation = (): UseMutationResult<
  TAuthUser,
  TApiError,
  TSignInForm
> => {
  return useMutation({ mutationFn: signInRequest });
};

export { useSignUpMutation, useSignInMutation };
