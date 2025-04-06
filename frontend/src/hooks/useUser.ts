import { END_POINT } from "@/constants/endpoint";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";
import { TApiError } from "@/types/api.types";
import {
  TEditUserForm,
  TUser,
  TUserSearch,
  TUserSearchResponse,
} from "@/types/user.types";
import { getApiError } from "@/utils/errors";
import { useState } from "react";
import toast from "react-hot-toast";
import DOMPurify from "dompurify";
// import { generateUsers } from "@/utils/mockUsers";

export const useUser = () => {
  const modal = document.getElementById("modal_edit_profile");
  const [isShowAddModal, setIsShowAddModal] = useState(false);
  const [isGetUserDetails, setIsGetUserDetails] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { authUser, setAuthUserDetails } = useAuthStore();
  const { setUsers, users } = useUserStore();
  const [addUsers, setAddUsers] = useState<TUser[]>([]);

  const removeAddUser = (contactId: string) => {
    setAddUsers((prevState) =>
      prevState.filter((user) => user._id !== contactId)
    );
  };

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
        setAuthUserDetails(responseData);
      }
    } catch (error: unknown) {
      toast.error(getApiError(error) ?? "Oops something went wrong");
    } finally {
      setIsGetUserDetails(true);
    }
  };

  const getContacts = async () => {
    try {
      setIsSearching(true);
      const query =
        searchQuery.length > 0 ? `?searchText=${searchQuery}&page=1` : "";
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${END_POINT.SEARCH}${query}`,
        {
          headers: { "Content-Type": "application/json" },
          method: "GET",
        }
      );
      if (!response.ok) {
        const errorData: TApiError = await response.json();
        throw errorData;
      }
      // just to test the skeleton
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve(true);
        }, 1500)
      );
      const responseData = (await response.json()) as TUserSearchResponse;
      setUsers(responseData.users);
    } catch (error: unknown) {
      toast.error(getApiError(error) ?? "Oops something went wrong");
    } finally {
      setIsSearching(false);
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
    if (action === "add") {
      const user = users.find((user) => user._id === contactId);
      console.log(user);
      if (user === undefined) {
        // setAddUsers((prevState) => [user, ...prevState]);
      }
    }
  };

  const deleteContact = async (contactId: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${END_POINT.ADD_CONTACT}/${authUser?.userId}/${contactId}`,
        {
          credentials: "same-origin",
          headers: { "Content-Type": "application/json" },
          method: "POST",
        }
      );
      if (!response.ok) {
        const errorData: TApiError = await response.json();
        throw errorData;
      }
      toast.success("Contact Added");
      await getUserDetails();
    } catch (error: unknown) {
      toast.error(getApiError(error));
    } finally {
    }
  };

  const addContact = async (contactId: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${END_POINT.ADD_CONTACT}/${authUser?.userId}/${contactId}`,
        {
          credentials: "same-origin",
          headers: { "Content-Type": "application/json" },
          method: "POST",
        }
      );
      if (!response.ok) {
        const errorData: TApiError = await response.json();
        throw errorData;
      }
      toast.success("Contact Added");
      await getUserDetails();
    } catch (error: unknown) {
      toast.error(getApiError(error));
    } finally {
    }
  };

  const closeModal = () => {
    if (modal && modal instanceof HTMLDialogElement) {
      modal?.close();
    }
  };

  const showModal = () => {
    // if (modal && modal instanceof HTMLDialogElement) {
    //   modal.showModal();
    // }
  };

  const toggleShowAddModal = () => setIsShowAddModal(!isShowAddModal);

  return {
    showModal,
    closeModal,
    contactAction,
    updateProfile,
    getUserDetails,
    getContacts,
    removeAddUser,
    toggleShowAddModal,
    addContact,
    deleteContact,
    addUsers,
    isGetUserDetails,
    isShowAddModal,
    isUpdating,
    isSearching,
  };
};
