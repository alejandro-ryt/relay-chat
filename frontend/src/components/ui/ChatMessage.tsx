import Avatar from "@/components/ui/Avatar";
import { ChatMessageProps } from "@/types/Chat.types";

const ChatMessage = ({ type, pic, name, time, message }: ChatMessageProps) => {
  if (type === "received") {
    return (
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <Avatar pic={pic} sizeClass="w-10" />
        </div>
        <div className="chat-header">
          {name}
          <time className="text-xs opacity-50">{time}</time>
        </div>
        <div className="chat-bubble">{message}</div>
      </div>
    );
  }
  if (type === "sent") {
    return (
      <div className="chat chat-end">
        <div className="chat-image avatar">
          <Avatar pic={pic} sizeClass="w-10" />
        </div>
        <div className="chat-header">
          {name}
          <time className="text-xs opacity-50">{time}</time>
        </div>
        <div className="chat-bubble">{message}</div>
      </div>
    );
  }
};

export default ChatMessage;
