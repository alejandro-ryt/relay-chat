import { END_POINT } from "@/constants/endpoint";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";
import { TApiError } from "@/types/api.types";
import { TEditUserForm, TUser } from "@/types/user.types";
import { getApiError } from "@/utils/errors";
import { useState } from "react";
import toast from "react-hot-toast";
import DOMPurify from "dompurify";
import { generateUsers } from "@/utils/mockUsers";

export const useUser = () => {
  const modal = document.getElementById("modal_edit_profile");
  const [isGetUserDetails, setIsGetUserDetails] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { authUser, setAuthUserDetails } = useAuthStore();
  const { setUsers } = useUserStore();

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
      const responseData = (await response.json()) as TUser;
      if (responseData) {
        setAuthUserDetails({ ...responseData, contacts: [] });
      }
    } catch (error: unknown) {
      toast.error(getApiError(error) ?? "Oops something went wrong");
    } finally {
      setIsGetUserDetails(true);
    }
  };

  const getContacts = async () => {
    try {
      setTimeout(() => {
        new Promise((resolve) => resolve(true));
      }, 1500);
      setUsers(generateUsers(10));
    } catch (error: unknown) {
      toast.error(getApiError(error) ?? "Oops something went wrong");
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
      if (responseData) {
        setAuthUserDetails({ ...responseData, contacts: [] });
      }
      toast.success("Profile Updated");
      closeModal();
    } catch (error: unknown) {
      toast.error(getApiError(error));
    } finally {
      setIsUpdating(false);
    }
  };

  const contactAction = (
    contactId: string,
    action: "add" | "block" | "delete"
  ) => {
    console.log("user id auth", authUser?.userId);
    console.log("action", action);
    console.log("contactId", contactId);
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
    contactAction,
    updateProfile,
    getUserDetails,
    getContacts,
    isGetUserDetails,
    isUpdating,
  };
};
