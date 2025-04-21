import { API } from "@/constants/api";
import { END_POINT } from "@/constants/endpoint";
import DATA from "@/constants/notFound";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";
import { TApiError } from "@/types/api.types";
import { getApiError } from "@/utils";
import toast from "react-hot-toast";

export const useAuth = () => {
  const { logOut } = useAuthStore();
  const { resetData } = useChatStore();

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

  return {
    logout,
  };
};
