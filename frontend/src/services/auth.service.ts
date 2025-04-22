import { END_POINT } from "@/constants/endpoint";
import { useAuthStore } from "@/store/useAuthStore";
import { TApiError } from "@/types/api.types";
import { TAuthUser, TSignInForm, TSignUpBody } from "@/types/auth.types";
import { TEditUserFormBody, TUser } from "@/types/user.types";
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

const useSignUpMutation = (): UseMutationResult<
  boolean,
  TApiError,
  TSignUpBody
> => {
  return useMutation({ mutationFn: signUpRequest });
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

const useSignInMutation = (): UseMutationResult<
  TAuthUser,
  TApiError,
  TSignInForm
> => {
  return useMutation({ mutationFn: signInRequest });
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

const useSignOutMutation = (): UseMutationResult<boolean, TApiError> => {
  return useMutation({ mutationFn: signOutRequest });
};

const updateProfile = async (values: TEditUserFormBody) => {
  const body = (({ userId, ...value }) => value)(values);
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}${END_POINT.USER_UPDATE}/${values.userId}`,
    {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify(body),
      credentials: "include",
    }
  );
  if (!response.ok) {
    const errorData: TApiError = await response.json();
    throw errorData;
  }
  return (await response.json()) as TUser;
};

const useUpdateProfileMutation = (): UseMutationResult<
  TUser,
  TApiError,
  TEditUserFormBody
> => {
  return useMutation({ mutationFn: updateProfile });
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

const useAuthDetailQuery = (): UseQueryResult<TUser, TApiError> => {
  const { authUser } = useAuthStore();
  return useQuery({
    queryKey: ["auth-detail", authUser!.userId],
    queryFn: () => getAuthDetails(authUser!.userId),
  });
};

export {
  useSignUpMutation,
  useSignInMutation,
  useSignOutMutation,
  useUpdateProfileMutation,
  useAuthDetailQuery,
};
