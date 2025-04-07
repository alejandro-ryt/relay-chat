import ChatMessage from "@/components/chat/ChatMessage";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";
import { TChatMember } from "@/types/chat.types";
import { useEffect } from "react";

const ChatHistory = () => {
  const { selectedChatData, getMessage } = useChatStore();
  const { authUser } = useAuthStore();

  const getMemberInfo = (userId: string): TChatMember | undefined => {
    const memberData = selectedChatData?.members.find(
      (member) => member._id === userId
    );

    return memberData;
  };

  useEffect(() => {
    if (selectedChatData) {
      getMessage(); // Get messages from socket
    }
  }, [selectedChatData]);

  return (
    <section
      className="flex-1 overflow-x-auto pr-3"
      ref={(el) => {
        if (el) {
          el.scrollTop = el.scrollHeight; // Scroll to bottom on render
        }
      }}
    >
      {selectedChatData?.messages.map((message) => {
        const messageType =
          authUser &&
          authUser.username === getMemberInfo(message.author)?.username
            ? "sent"
            : "received";

        return (
          <ChatMessage
            key={message._id}
            type={messageType}
            name={getMemberInfo(message.author)?.username || ""}
            pic={getMemberInfo(message.author)?.profilePic || ""}
            time={new Date(message.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            message={message.message}
          />
        );
      })}
    </section>
  );
};

export default ChatHistory;
