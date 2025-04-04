import { motion } from "motion/react";
import ContactCard from "@/components/chat/ContactCard";
import { useCurrentChatState } from "@/store/useChatStore";
import { TRecentChatsProps } from "@/types/Chat.types";

const ChatSidebar = ({ showSidebar }: TRecentChatsProps) => {
  const { selectedChatData } = useCurrentChatState();

  return (
    <motion.section
      className="flex flex-col p-4 mr-[-1rem] mt-[-1rem] mb-[-1rem] bg-base-200"
      initial={{ width: "0rem", display: "none", opacity: 0 }}
      animate={{
        display: showSidebar ? "flex" : "none",
        opacity: showSidebar ? 100 : 0,
        width: showSidebar ? "25rem" : "0rem",
        marginLeft: showSidebar ? "1rem" : "0rem",
        padding: showSidebar ? "1rem" : "0rem",
      }}
      transition={{ duration: 0.2 }}
    >
      <h1 className="text-2xl font-bold">Chat Info</h1>
      <p className="text-sm">Members ({selectedChatData?.members.length}):</p>

      {selectedChatData?.members
        ? selectedChatData?.members.map((member) => {
            return (
              <ContactCard
                key={member.username}
                pic={member.profilePic}
                name={`${member.firstName} ${member.lastName}`}
              />
            );
          })
        : null}
    </motion.section>
  );
};

export default ChatSidebar;
