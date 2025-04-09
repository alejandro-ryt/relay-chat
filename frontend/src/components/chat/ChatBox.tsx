import ChatInput from "@/components/chat/ChatInput";
import ChatHistory from "@/components/chat/ChatHistory";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatHeader from "@/components/chat/ChatHeader";

const ChatBox = () => {
  return (
    <section className="relative flex flex-row w-full h-auto">
      <section className="flex flex-col w-full h-full">
        {/* Header of the ChatBox */}
        <ChatHeader />

        {/* Chat History */}
        <ChatHistory />

        {/* Message Input */}
        <ChatInput />
      </section>

      {/* Sidebar */}
      <ChatSidebar />
    </section>
  );
};

export default ChatBox;
