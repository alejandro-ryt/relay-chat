import { TApiError } from "@/types/api.types";

export const getApiError = (error: unknown) => {
  if (typeof error === "object" && error !== null) {
    const apiError = error as TApiError;
    return apiError.error;
  }
  return "Oops something went wrong";
};
