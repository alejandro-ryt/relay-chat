import { useEffect } from "react";
import { motion } from "motion/react";
import ChatBox from "@/components/chat/ChatBox";
import RecentChats from "@/components/chat/RecentChats";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";
import { useGetChatQuery } from "@/services/chat.service";

const Chat = () => {
  const { selectedChatId, setSelectedChatData, setSelectedChatPreviewData } =
    useChatStore();
  const { authUser } = useAuthStore();
  const { data, refetch } = useGetChatQuery(authUser!.userId);

  useEffect(() => {
    if (data) {
      setSelectedChatPreviewData(data);
      setSelectedChatData(authUser!.userId); // Fetch chat data when selectedChatId changes
    }
  }, [data, selectedChatId]);

  useEffect(() => {
    refetch();
  }, [selectedChatId]);

  return (
    <motion.section className="bg-base-100 flex flex-1 h-full md:h-[calc(100dvh-4rem)] rounded-[1.5rem] m-2">
      {/* Recent Chats */}
      <RecentChats />

      {/* Chat Box */}
      {selectedChatId ? (
        <ChatBox />
      ) : (
        <div className="flex flex-col items-center justify-center p4 md:p-8 w-full">
          {/* Title */}
          <h1 className="text-3xl font-semibold mb-4 text-center text-base-content">
            Welcome {authUser?.username}! 😎
          </h1>

          {/* Description */}
          <p className="text-center text-sm text-base-content p-2">
            Chat with your friends, family, or anyone you want!
          </p>
        </div>
      )}
    </motion.section>
  );
};

export default Chat;
