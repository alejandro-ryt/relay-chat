import { motion } from "motion/react";
import ContactCard from "@/components/chat/ContactCard";
import { useChatStore } from "@/store/useChatStore";

const ChatSidebar = () => {
  const { selectedChatData, chatInfoSidebar } = useChatStore();

  return (
    <motion.section
      className="flex flex-col p-4 bg-base-200"
      initial={{ width: "0rem", display: "none", opacity: 0 }}
      animate={{
        display: chatInfoSidebar ? "flex" : "none",
        opacity: chatInfoSidebar ? 100 : 0,
        width: chatInfoSidebar ? "25rem" : "0rem",
        marginLeft: chatInfoSidebar ? "1rem" : "0rem",
        padding: chatInfoSidebar ? "1rem" : "0rem",
      }}
      transition={{ ease: "anticipate", duration: 0.3 }}
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
