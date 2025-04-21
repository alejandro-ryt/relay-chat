import { END_POINT } from "@/constants/endpoint";
import { TPreviewChat } from "@/types/chat.types";

export const useChat = () => {
  // Get Chats by User ID
  const getChatsByUserId = async (
    userId: string
  ): Promise<TPreviewChat[] | null> => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${END_POINT.GET_CHATS_BY_USER_ID}${userId}`,
        {
          headers: { "Content-Type": "application/json" },
          method: "GET",
          credentials: "include"
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Failed to fetch chat preview data:", error);
      return null;
    }
  };

  return { getChatsByUserId };
};
