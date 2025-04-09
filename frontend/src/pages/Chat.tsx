import { useEffect } from "react";
import { motion } from "motion/react";
import ChatBox from "@/components/chat/ChatBox";
import RecentChats from "@/components/chat/RecentChats";
import { useChat } from "@/hooks/useChat";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";

const Chat = () => {
  const { selectedChatId, setSelectedChatData, setSelectedChatPreviewData } =
    useChatStore();
  const { getChatsByUserId } = useChat();
  const { authUser } = useAuthStore();

  useEffect(() => {
    const fetchSelectedChatPreviewData = async () => {
      setSelectedChatData();
      if (authUser?.userId) {
        try {
          const chats = await getChatsByUserId(authUser.userId);
          setSelectedChatPreviewData(authUser.userId, chats);
        } catch (error) {
          console.error("Error fetching chats:", error);
          setSelectedChatPreviewData(authUser.userId, []);
        }
      }
    };

    fetchSelectedChatPreviewData();
  }, [selectedChatId, authUser?.userId]);

  useEffect(() => {
    setSelectedChatData();
  }, []);

  return (
    <motion.section className="bg-base-100 flex flex-1 h-full rounded-[1.5rem] m-2">
      {/* Recent Chats */}
      <RecentChats />

      {/* Chat Box */}
      {selectedChatId ? (
        <ChatBox />
      ) : (
        <div className="flex flex-col items-center justify-center p-8 w-full h-dvh-100">
          {/* Title */}
          <h1 className="text-3xl font-semibold mb-4 text-base-content">
            Welcome {authUser?.username}! 😎
          </h1>

          {/* Description */}
          <p className="text-center text-sm text-base-content mb-8">
            Chat with your friends, family, or anyone you want!
          </p>
        </div>
      )}
    </motion.section>
  );
};

export default Chat;
