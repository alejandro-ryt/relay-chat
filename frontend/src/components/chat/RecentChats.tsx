import ChatPreview from "@/components/chat/ChatPreview";
import SearchInput from "@/components/chat/SearchInput";
import IconButton from "@/components/ui/IconButton";
import ArrowIcon from "@/components/ui/icons/ArrowIcon";
import useDebounce from "@/hooks/useDebounce";
import { useChatStore } from "@/store/useChatStore";
import { TRecentChatsProps } from "@/types/chat.types";
import { motion } from "motion/react";
import { SyntheticEvent, useEffect, useState } from "react";

const RecentChats = ({ showSidebar, setShowSidebar }: TRecentChatsProps) => {
  const { setSelectedChatId, chatPreviewArray, filterChats } = useChatStore();
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

    console.log(filtered);
  }, [debouncedSearchTerm, chatPreviewArray]);

  return (
    <section className="flex flex-col max-w-72 ">
      <section className="m-2">
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

      {/* Show / Hide Control Sidebar */}
      <section className="flex m-8 ml-5">
        <motion.div
          role="button"
          initial={{ rotate: 180 }}
          animate={{
            rotate: showSidebar ? 180 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          <IconButton
            shape="round"
            title="Contacts"
            icon={<ArrowIcon />}
            action={() => setShowSidebar(!showSidebar)}
          />
        </motion.div>
      </section>
    </section>
  );
};

export default RecentChats;
