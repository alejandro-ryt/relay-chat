import { END_POINT } from "@/constants/endpoint";
import { QUERY_KEY } from "@/constants/fetchQuery";
import { TApiError } from "@/types/api.types";
import { TPreviewChat } from "@/types/chat.types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

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

export { useGetChatQuery };
