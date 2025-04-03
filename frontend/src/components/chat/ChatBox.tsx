import { useState } from "react";
import { motion } from "motion/react";
import ChatInput from "@/components/chat/ChatInput";
import VerticalDotsIcon from "@/components/ui/icons/VerticalDotsIcon";
import ChatMessage from "@/components/chat/ChatMessage";
import ContactCard from "@/components/chat/ContactCard";
import IconButton from "@/components/ui/IconButton";
import { useCurrentChatState } from "@/store/useChat";
import { useAuthStore } from "@/store/useAuthStore";

const ChatBox = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { selectedChatData, selectedChatPreviewData } = useCurrentChatState();
  const { authUser } = useAuthStore();

  return (
    <section className="relative flex flex-row w-full h-auto m-4">
      <section className="flex flex-col w-full h-full">
        {/* Header of the ChatBox */}
        <section className="flex flex-row justify-between items-center mb-6">
          <div role="group" className="flex flex-col">
            <h1 className="text-2xl font-bold">
              {selectedChatPreviewData?.chatName}
            </h1>
            <p className="text-sm">
              {selectedChatData?.members.length} members
            </p>
          </div>

          <IconButton
            shape="round"
            title="Contacts"
            icon={<VerticalDotsIcon />}
            action={() => setShowSidebar(!showSidebar)}
          />
        </section>
        {/* Chat History */}
        <section className="flex-1">
          {selectedChatData?.messages
            ? selectedChatData.messages.map((message) => {
                const messageType =
                  authUser && authUser.username === message.username
                    ? "sent"
                    : "received";

                return (
                  <ChatMessage
                    key={`${message.timestamp}-${Math.random().toString()}`}
                    type={messageType}
                    name={message.username}
                    pic="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    time="12:45"
                    message={message.message}
                  />
                );
              })
            : null}
        </section>
        {/* Message Input */}
        <section className="w-full">
          <ChatInput />
        </section>
      </section>

      {/* Sidebar */}
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
        <p className="text-sm">Members:</p>

        <ContactCard
          pic="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          name="Obi-Wan Kenobi"
        />

        <ContactCard
          pic="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          name="Anakin"
        />
      </motion.section>
    </section>
  );
};

export default ChatBox;
