import { END_POINT } from "@/constants/endpoint";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";
import { TApiError } from "@/types/api.types";
import { TEditUserForm } from "@/types/user.types";
import { getApiError } from "@/utils/errors";
import { useState } from "react";
import toast from "react-hot-toast";
import DOMPurify from "dompurify";

export const useUser = () => {
  const modal = document.getElementById("modal_edit_profile");
  const [isGetUserDetails, setIsGetUserDetails] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { authUser } = useAuthStore();
  const { setUser } = useUserStore();

  const getUserDetails = async () => {
    try {
      setIsGetUserDetails(true);
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${END_POINT.USER}/${authUser?.userId}`,
        { method: "GET" }
      );
      if (!response.ok) {
        const errorData: TApiError = await response.json();
        throw errorData;
      }
      const responseData = await response.json();
      if (responseData) {
        setUser(responseData);
      }
    } catch (error: unknown) {
      toast.error(getApiError(error) ?? "Oops something went wrong");
    } finally {
      setIsGetUserDetails(true);
    }
  };

  const updateProfile = async (values: TEditUserForm) => {
    try {
      setIsUpdating(true);
      const sanitizeData: TEditUserForm = {
        firstName: DOMPurify.sanitize(values.firstName),
        lastName: DOMPurify.sanitize(values.lastName),
        profilePic: DOMPurify.sanitize(values.profilePic),
      };
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${END_POINT.USER_UPDATE}/${authUser?.userId}`,
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
      const responseData = await response.json();
      console.log("updated", responseData);
      if (responseData) {
        setUser(responseData);
      }
      toast.success("Profile Updated");
      closeModal();
    } catch (error: unknown) {
      toast.error(getApiError(error));
    } finally {
      setIsUpdating(false);
    }
  };

  const closeModal = () => {
    if (modal && modal instanceof HTMLDialogElement) {
      modal.close();
    }
  };

  const showModal = () => {
    if (modal && modal instanceof HTMLDialogElement) {
      modal.showModal();
    }
  };

  return {
    showModal,
    closeModal,
    updateProfile,
    getUserDetails,
    isGetUserDetails,
    isUpdating,
  };
};
