import { END_POINT } from "@/constants/endpoint";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";
import { TApiError } from "@/types/api.types";
import { TEditUserForm, TUser, TUserSearchResponse } from "@/types/user.types";
import { getApiError } from "@/utils";
import { SyntheticEvent, useState } from "react";
import toast from "react-hot-toast";
import DOMPurify from "dompurify";
import { useChatStore } from "@/store/useChatStore";
import { TJoinChat } from "@/types/chat.types";
import { useNavigate } from "react-router";
import { ROUTES } from "@/constants/routes";
import useDebounce from "@/hooks/useDebounce";
import { TCreateChatForm } from "@/schemas/create";
import DATA from "@/constants/notFound";
import { API } from "@/constants/api";

export const useUser = () => {
  const navigate = useNavigate();
  const [isShowAddModal, setIsShowAddModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isGetUserDetails, setIsGetUserDetails] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [addUsers, setAddUsers] = useState<TUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { setUsers } = useUserStore();
  const { authUser, authUserDetails, setAuthUserDetails } = useAuthStore();
  const { joinChat } = useChatStore();

  const removeAddUser = (contactId: string) => {
    setAddUsers((prevState) =>
      prevState.filter((user) => user._id !== contactId)
    );
  };

  const handleFilterContact = (
    event: SyntheticEvent<HTMLInputElement, Event>
  ) => {
    const value = (event.target as HTMLInputElement).value;
    setSearchTerm(value);
  };

  const handleFilterSearchUser = (
    event: SyntheticEvent<HTMLInputElement, Event>
  ) => {
    const value = (event.target as HTMLInputElement).value;
    setSearchQuery(value);
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
      toast.error(getApiError(error) ?? DATA.API_ERROR);
    } finally {
      setIsGetUserDetails(true);
    }
  };

  // const getContacts = async () => {
  //   try {
  //     setIsSearching(true);
  //     const query =
  //       searchQuery.length > 0 ? `?searchText=${searchQuery}&page=1` : "";
  //     const response = await fetch(
  //       `${import.meta.env.VITE_BASE_URL}${END_POINT.SEARCH}${query}`,
  //       {
  //         headers: { "Content-Type": "application/json" },
  //         method: "GET",
  //       }
  //     );
  //     if (!response.ok) {
  //       const errorData: TApiError = await response.json();
  //       throw errorData;
  //     }
  //     const responseData = (await response.json()) as TUserSearchResponse;
  //     const filterContacts = responseData.users.filter(
  //       (user) => user._id !== authUser?.userId
  //     );
  //     setUsers(filterContacts);
  //   } catch (error: unknown) {
  //     toast.error(getApiError(error) ?? DATA.API_ERROR);
  //   } finally {
  //     setIsSearching(false);
  //   }
  // };

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
      toast.success(API.PROFILE_UPDATED);
      toggleShowEditModal();
    } catch (error: unknown) {
      toast.error(getApiError(error) ?? DATA.API_ERROR);
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
      toast.success(API.CONTACT_REMOVE);
      await getUserDetails();
    } catch (error: unknown) {
      toast.error(getApiError(error) ?? DATA.API_ERROR);
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
      toast.success(API.CONTACT_BLOCK);
      await getUserDetails();
    } catch (error: unknown) {
      toast.error(getApiError(error) ?? DATA.API_ERROR);
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
      toast.success(API.CONTACT_ADDED);
      await getUserDetails();
    } catch (error: unknown) {
      toast.error(getApiError(error) ?? DATA.API_ERROR);
    }
  };

  const startChat = (data: TCreateChatForm) => {
    const chatName =
      data.chatName === "individual"
        ? `${authUserDetails?.username}-${addUsers[0].username}`
        : data.chatName;
    const joinData: TJoinChat =
      addUsers.length === 1
        ? {
            membersIds: addUsers.map((value) => value._id),
            chatName,
            currentUserId: authUser!.userId,
            type: "direct",
          }
        : {
            membersIds: addUsers.map((value) => value._id),
            chatName,
            currentUserId: authUser!.userId,
            type: "group",
          };
    const isJoined = joinChat(joinData);
    if (isJoined) {
      toast.success(API.CHAT_CREATED);
      navigate(ROUTES.CHAT);
    }
  };

  const toggleShowAddModal = () => setIsShowAddModal(!isShowAddModal);

  const toggleShowEditModal = () => setIsShowEditModal(!isShowEditModal);

  const debouncedSearchContactTerm = useDebounce(searchTerm, 300);

  return {
    addStartChat,
    updateProfile,
    getUserDetails,
    removeAddUser,
    toggleShowAddModal,
    toggleShowEditModal,
    addContact,
    deleteContact,
    setSearchQuery,
    blockContact,
    startChat,
    handleFilterContact,
    handleFilterSearchUser,
    debouncedSearchContactTerm,
    searchTerm,
    searchQuery,
    addUsers,
    isGetUserDetails,
    isShowAddModal,
    isShowEditModal,
    isUpdating,
    isSearching,
  };
};
