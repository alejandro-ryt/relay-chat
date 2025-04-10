import { motion } from "motion/react";
import IconButton from "@/components/ui/IconButton";
import VerticalDotsIcon from "@/components/ui/icons/VerticalDotsIcon";
import { useChatStore } from "@/store/useChatStore";
import Avatar from "@/components/ui/Avatar";
import ArrowIcon from "@/components/ui/icons/ArrowIcon";

const ChatHeader = () => {
  const {
    selectedChatData,
    selectedChatPreviewData,
    recentChatsSidebar,
    setRecentChatsSidebar,
    chatInfoSidebar,
    setChatInfoSidebar,
  } = useChatStore();

  return (
    <section className="flex justify-between items-center h-14 m-2">
      <section className="flex flex-row">
        {/* Show / Hide Control Recent Chats Sidebar */}
        <motion.div
          className="flex h-auto items-center justify-center cursor-pointer"
          role="button"
          initial={{ rotate: 180 }}
          animate={{
            rotate: recentChatsSidebar ? 0 : 180,
          }}
          transition={{ duration: 0.2 }}
        >
          <section className="flex flex-row justify-center items-center h-10 mr-1">
            <IconButton
              shape="round"
              title="Contacts"
              icon={<ArrowIcon />}
              action={() => setRecentChatsSidebar(!recentChatsSidebar)}
            />
          </section>
        </motion.div>
        <Avatar pic={selectedChatPreviewData?.chatPic} sizeClass="w-12" />
        <section className="flex flex-col ml-2">
          <h1 className="text-xl font-bold truncate">
            {selectedChatPreviewData?.chatName}
          </h1>
          <p className="text-sm">{selectedChatData?.members.length} members</p>
        </section>
      </section>

      <IconButton
        shape="round"
        title="Contacts"
        icon={<VerticalDotsIcon />}
        action={() => setChatInfoSidebar(!chatInfoSidebar)}
      />
    </section>
  );
};

export default ChatHeader;
