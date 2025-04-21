import { END_POINT } from "@/constants/endpoint";
import { TApiError } from "@/types/api.types";
import { TAuthUser, TSignInForm, TSignUpBody } from "@/types/auth.types";
import { TUser } from "@/types/user.types";
import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

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

const signOutRequest = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}${END_POINT.LOGOUT}`,
    { method: "POST", credentials: "include" }
  );
  if (!response.ok) {
    const errorData: TApiError = await response.json();
    throw errorData;
  }
  return response.ok;
};

const getAuthDetails = async (userId: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}${END_POINT.USER}/${userId}`,
    { method: "GET", credentials: "include" }
  );
  if (!response.ok) {
    const errorData: TApiError = await response.json();
    throw errorData;
  }
  return (await response.json()) as TUser;
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

const useSignOutMutation = (): UseMutationResult<boolean, TApiError> => {
  return useMutation({ mutationFn: signOutRequest });
};

const useAuthDetailQuery = (
  userId: string
): UseQueryResult<TUser, TApiError> => {
  return useQuery({
    queryKey: ["auth-detail", userId],
    queryFn: () => getAuthDetails(userId),
  });
};

export {
  useSignUpMutation,
  useSignInMutation,
  useSignOutMutation,
  useAuthDetailQuery,
};
