import { useEffect, useState } from "react";
import { motion } from "motion/react";
import ChatBox from "@/components/chat/ChatBox";
import RecentChats from "@/components/chat/RecentChats";
import { useCurrentChatState } from "@/store/useChat";

const Chat = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { selectedChatId, setSelectedChatData, setSelectedChatPreviewData } =
    useCurrentChatState();

  useEffect(() => {
    setSelectedChatData();
    setSelectedChatPreviewData();
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
      {selectedChatId ? <ChatBox /> : <section>Start a Chat</section>}
    </motion.section>
  );
};

export default Chat;
