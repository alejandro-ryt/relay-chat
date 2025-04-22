import { END_POINT } from "@/constants/endpoint";
import { useAuthStore } from "@/store/useAuthStore";
import { TApiError } from "@/types/api.types";
import { TEditUserForm, TUser } from "@/types/user.types";
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
  const [isUpdating, setIsUpdating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [addUsers, setAddUsers] = useState<TUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { authUser, authUserDetails, setAuthUserDetails } = useAuthStore();
  const { joinChat } = useChatStore();

  const removeAddUser = (contactId: string) =>
    setAddUsers((prevState) =>
      prevState.filter((user) => user._id !== contactId)
    );

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
          credentials: "include",
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
    removeAddUser,
    toggleShowAddModal,
    toggleShowEditModal,
    setSearchQuery,
    startChat,
    handleFilterContact,
    handleFilterSearchUser,
    debouncedSearchContactTerm,
    searchTerm,
    searchQuery,
    addUsers,
    isShowAddModal,
    isShowEditModal,
    isUpdating,
  };
};
