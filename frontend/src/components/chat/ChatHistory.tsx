import { useEffect } from "react";
import ChatMessage from "@/components/chat/ChatMessage";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";
import { TChatMember } from "@/types/chat.types";

const ChatHistory = () => {
  const setupNotificationListener = useChatStore(
    (state) => state.setupNotificationListener
  );
  const { selectedChatData, chatPreviewArray, selectedChatId, getMessage } =
    useChatStore();
  const { authUser } = useAuthStore();

  const getMemberInfo = (userId: string): TChatMember | undefined => {
    const memberData = selectedChatData?.members.find(
      (member) => member._id === userId
    );

    return memberData;
  };

  useEffect(() => {
    setupNotificationListener();
  }, [setupNotificationListener]);

  useEffect(() => {
    if (selectedChatData) {
      getMessage(); // Get messages from socket
    }
  }, [selectedChatData]);

  return (
    <section
      className="flex-1 overflow-x-auto m-2 mr-0 pr-3"
      ref={(el) => {
        if (el) {
          el.scrollTop = el.scrollHeight; // Scroll to bottom on render
        }
      }}
    >
      {selectedChatData?.messages.map((message) => {
        const currentChat = chatPreviewArray?.find(
          (chat) => chat.id === selectedChatId
        );

        if (currentChat?.lastMessage) {
          currentChat.lastMessage.message = message.message; // Update the last message in the chat preview array
        }

        const messageType =
          authUser &&
          authUser.username === getMemberInfo(message.author._id)?.username
            ? "sent"
            : "received";

        return (
          <ChatMessage
            key={message._id}
            id={message._id}
            type={messageType}
            name={getMemberInfo(message.author._id)?.username || ""}
            pic={getMemberInfo(message.author._id)?.profilePic || ""}
            time={new Date(message.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            message={message.message}
            deletedAt={message.deletedAt}
            updatedAt={message.updatedAt}
          />
        );
      })}
    </section>
  );
};

export default ChatHistory;
