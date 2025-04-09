import ChatPreview from "@/components/chat/ChatPreview";
import SearchInput from "@/components/chat/SearchInput";
import IconButton from "@/components/ui/IconButton";
import ArrowIcon from "@/components/ui/icons/ArrowIcon";
import { useChatStore } from "@/store/useChatStore";
import { TRecentChatsProps } from "@/types/chat.types";
import { motion } from "motion/react";

const RecentChats = ({ showSidebar, setShowSidebar }: TRecentChatsProps) => {
  const { setSelectedChatId, chatPreviewArray } = useChatStore();

  return (
    <section className="flex flex-col max-w-72 ">
      <SearchInput value="" handleOnchange={() => {}} />

      {/* Chats Preview */}
      <section className="flex flex-col flex-1">
        {chatPreviewArray?.map((preview) => {
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
