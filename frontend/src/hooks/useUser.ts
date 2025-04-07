import { END_POINT } from "@/constants/endpoint";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";
import { TApiError } from "@/types/api.types";
import { TEditUserForm, TUser, TUserSearchResponse } from "@/types/user.types";
import { getApiError } from "@/utils/errors";
import { useState } from "react";
import toast from "react-hot-toast";
import DOMPurify from "dompurify";
import { useChatStore } from "@/store/useChatStore";
import { TJoinChat } from "@/types/chat.types";
import { useNavigate } from "react-router";
import { ROUTES } from "@/constants/routes";

export const useUser = () => {
  const navigate = useNavigate();
  const [isShowAddModal, setIsShowAddModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isGetUserDetails, setIsGetUserDetails] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [addUsers, setAddUsers] = useState<TUser[]>([]);
  const { setUsers } = useUserStore();
  const { authUser, authUserDetails, setAuthUserDetails } = useAuthStore();
  const { joinChat } = useChatStore();

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
          method: "PUT",
          body: JSON.stringify(sanitizeData),
        }
      );
      if (!response.ok) {
        const errorData: TApiError = await response.json();
        throw errorData;
      }
      const responseData = await response.json();
      if (responseData) {
        setAuthUserDetails(responseData);
      }
      toast.success("Profile Updated");
      toggleShowEditModal();
    } catch (error: unknown) {
      toast.error(getApiError(error) ?? "Oops something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const addStartChat = (contactId: string) => {
    const user = authUserDetails?.contacts.find(
      (user) => user.contact._id === contactId
    );
    if (user) {
      setAddUsers((prevState) => {
        const isDuplicate = prevState.some(
          (existingUser) => existingUser._id === user.contact._id
        );
        return isDuplicate ? prevState : [user.contact, ...prevState];
      });
    }
  };

  const deleteContact = async (contactId: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${END_POINT.REMOVE_CONTACT}/${authUser?.userId}/${contactId}`,
        {
          credentials: "same-origin",
          headers: { "Content-Type": "application/json" },
          method: "DELETE",
        }
      );
      if (!response.ok) {
        const errorData: TApiError = await response.json();
        throw errorData;
      }
      toast.success("Contact Removed");
      await getUserDetails();
    } catch (error: unknown) {
      toast.error(getApiError(error) ?? "Oops something went wrong");
    }
  };

  const blockContact = async (contactId: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${END_POINT.BLOCK_CONTACT}/${authUser?.userId}/${contactId}`,
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
      toast.success("Contact Blocked");
      await getUserDetails();
    } catch (error: unknown) {
      toast.error(getApiError(error) ?? "Oops something went wrong");
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
      toast.error(getApiError(error) ?? "Oops something went wrong");
    } finally {
    }
  };

  const generateAvatar = (firstName: string, lastName: string) =>
    `https://ui-avatars.com/api/?name=${firstName.at(0)}+${lastName.at(0)}`;

  const startChat = (chatName: string) => {
    const joinData: TJoinChat =
      addUsers.length === 1
        ? {
            membersIds: addUsers.map((value) => value._id),
            chatName: chatName,
            currentUserId: authUser!.userId,
            type: "direct",
          }
        : {
            membersIds: addUsers.map((value) => value._id),
            chatName: chatName,
            currentUserId: authUser!.userId,
            type: "group",
          };
    const isJoined = joinChat(joinData);
    if (isJoined) {
      toast.success("Chat Created");
      navigate(ROUTES.CHAT);
    }
  };

  const toggleShowAddModal = () => setIsShowAddModal(!isShowAddModal);

  const toggleShowEditModal = () => setIsShowEditModal(!isShowEditModal);

  return {
    addStartChat,
    updateProfile,
    getUserDetails,
    getContacts,
    removeAddUser,
    toggleShowAddModal,
    toggleShowEditModal,
    addContact,
    deleteContact,
    setSearchQuery,
    blockContact,
    generateAvatar,
    startChat,
    searchQuery,
    addUsers,
    isGetUserDetails,
    isShowAddModal,
    isShowEditModal,
    isUpdating,
    isSearching,
  };
};
