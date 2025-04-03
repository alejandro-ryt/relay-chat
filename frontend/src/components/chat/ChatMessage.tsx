import Avatar from "@/components/ui/Avatar";
import { TChatMessageProps } from "@/types/chat.types";

const ChatMessage = ({ type, pic, name, time, message }: TChatMessageProps) => {
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
        <div className="chat-bubble rounded-[0.8rem]">{message}</div>
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
        <div className="chat-bubble rounded-[0.8rem] bg-base-200">
          {message}
        </div>
      </div>
    );
  }
};

export default ChatMessage;
