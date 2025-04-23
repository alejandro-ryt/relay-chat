import { END_POINT } from "@/constants/endpoint";
import { QUERY_KEY } from "@/constants/fetchQuery";
import { TApiError } from "@/types/api.types";
import { TPreviewChat } from "@/types/chat.types";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";

const getChat = async (userId: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}${END_POINT.GET_CHATS_BY_USER_ID}${userId}`,
    {
      headers: { "Content-Type": "application/json" },
      method: "GET",
      credentials: "include",
    }
  );

  if (!response.ok) {
    const errorData: TApiError = await response.json();
    throw errorData;
  }

  return (await response.json()) as TPreviewChat[] | null;
};

const useGetChatQuery = (
  userId: string
): UseQueryResult<TPreviewChat[] | null, TApiError> => {
  return useQuery({
    queryKey: [QUERY_KEY.CHAT],
    queryFn: () => getChat(userId),
  });
};

const deleteMessage = async (messageId: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}${END_POINT.DELETE_MESSAGE}${messageId}`,
    {
      headers: { "Content-Type": "application/json" },
      method: "DELETE",
      credentials: "include",
    }
  );
  if (!response.ok) {
    const errorData: TApiError = await response.json();
    throw errorData;
  }
  return response.ok;
};

const useDeleteMessageMutation = (): UseMutationResult<
  boolean,
  TApiError,
  string
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (messageId: string) => deleteMessage(messageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CHAT] });
    },
  });
};

export { useGetChatQuery, useDeleteMessageMutation };
