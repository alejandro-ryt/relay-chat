import ChatBox from "@/components/chat/ChatBox";
import RecentChats from "@/components/chat/RecentChats";
import { useChat } from "@/hooks/useChat";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const Chat = () => {
  const [showSidebar, setShowSidebar] = useState(false);
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
    <motion.section
      className="absolute right-0 bottom-0 top-0 bg-base-100 flex flex-1 min-h-auto rounded-[1.5rem] m-2"
      animate={{
        width: !showSidebar
          ? "calc(100% - var(--spacing) * 26)"
          : "calc(100% - var(--spacing) * 4)",
      }}
      transition={{ duration: 0.2 }}
    >
      {/* Recent Chats */}
      <RecentChats showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      {/* Chat Box */}
      {selectedChatId ? (
        <ChatBox />
      ) : (
        <div className="flex flex-col items-center justify-center p-8">
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
