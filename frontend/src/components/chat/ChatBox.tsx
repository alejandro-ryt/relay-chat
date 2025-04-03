import { useState } from "react";
import ChatInput from "@/components/chat/ChatInput";
import ChatHistory from "@/components/chat/ChatHistory";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatHeader from "@/components/chat/ChatHeader";

const ChatBox = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <section className="relative flex flex-row w-full h-auto m-4">
      <section className="flex flex-col w-full h-full">
        {/* Header of the ChatBox */}
        <ChatHeader showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

        {/* Chat History */}
        <ChatHistory />

        {/* Message Input */}
        <ChatInput />
      </section>

      {/* Sidebar */}
      <ChatSidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
    </section>
  );
};

export default ChatBox;
