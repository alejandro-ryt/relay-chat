import ChatMessage from "@/components/chat/ChatMessage";
import { useAuthStore } from "@/store/useAuthStore";
import { useCurrentChatState } from "@/store/useChat";

const ChatHistory = () => {
  const { selectedChatData } = useCurrentChatState();
  const { authUser } = useAuthStore();

  const getMemberPic = (username: string): string | undefined => {
    return selectedChatData?.members.find(
      (member) => member.username === username
    )?.chatPic;
  };

  return (
    <section className="flex-1">
      {selectedChatData?.messages
        ? selectedChatData.messages.map((message) => {
            console.log(authUser?.username);

            const messageType =
              authUser && authUser.username === message.username
                ? "sent"
                : "received";

            return (
              <ChatMessage
                key={`${message.timestamp}-${Math.random().toString()}`}
                type={messageType}
                name={message.username}
                pic={getMemberPic(message.username) || ""}
                time="12:45"
                message={message.content}
              />
            );
          })
        : null}
    </section>
  );
};

export default ChatHistory;
