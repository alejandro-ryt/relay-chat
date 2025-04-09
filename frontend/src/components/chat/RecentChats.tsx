import { motion } from "motion/react";
import { SyntheticEvent, useEffect, useState } from "react";
import clsx from "clsx";
import ChatPreview from "@/components/chat/ChatPreview";
import SearchInput from "@/components/chat/SearchInput";
import useDebounce from "@/hooks/useDebounce";
import { useChatStore } from "@/store/useChatStore";

const RecentChats = () => {
  const {
    setSelectedChatId,
    chatPreviewArray,
    filterChats,
    recentChatsSidebar,
  } = useChatStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [chatsArray, setChatsArray] = useState(chatPreviewArray);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const handleFilterContact = (
    event: SyntheticEvent<HTMLInputElement, Event>
  ) => {
    const value = (event.target as HTMLInputElement).value;
    setSearchTerm(value);
  };

  useEffect(() => {
    const filtered = filterChats(searchTerm);
    setChatsArray(
      filtered && filtered.length > 0 ? filtered : chatPreviewArray || []
    );
  }, [debouncedSearchTerm, chatPreviewArray]);

  return (
    <motion.section
      className="flex flex-col border-r-1 border-base-200"
      initial={{ width: "0rem", display: "none", opacity: 0 }}
      animate={{
        display: recentChatsSidebar ? "flex" : "none",
        opacity: recentChatsSidebar ? 100 : 0,
        width: recentChatsSidebar ? "25rem" : "0rem",
      }}
      transition={{ ease: "anticipate", duration: 0.3 }}
    >
      <section className="flex justify-center items-center h-14 m-2">
        <SearchInput value={searchTerm} handleOnchange={handleFilterContact} />
      </section>

      {/* Chats Preview */}
      <section className="flex flex-col flex-1">
        {chatsArray?.map((preview) => {
          return (
            <ChatPreview
              key={preview.id}
              id={preview.id}
              pic={preview.chatPic}
              title={preview.chatName}
              message={preview.lastMessage?.message || ""}
              action={() => setSelectedChatId(preview.id)}
            />
          );
        })}
      </section>
    </motion.section>
  );
};

export default RecentChats;
