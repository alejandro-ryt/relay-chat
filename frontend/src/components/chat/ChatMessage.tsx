import Avatar from "@/components/ui/Avatar";
import { TChatMessageProps } from "@/types/chat.types";
import clsx from "clsx";

const ChatMessage = ({ type, pic, name, time, message }: TChatMessageProps) => {
  const typeClass = clsx(
    "chat",
    type === "received" ? "chat-start" : "chat-end"
  );

  const colorClass = clsx(
    "chat-bubble shadow-sm rounded-[0.8rem]",
    type === "received" ? "bg-base-200" : "bg-primary text-primary-content"
  );

  return (
    <div className={typeClass}>
      <div className="chat-image avatar">
        <Avatar pic={pic} sizeClass="w-10" />
      </div>
      <div className="chat-header">
        {name}
        <time className="text-xs opacity-50">{time}</time>
      </div>
      <div className={colorClass}>{message}</div>
    </div>
  );
};

export default ChatMessage;
