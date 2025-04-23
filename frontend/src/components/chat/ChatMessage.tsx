import clsx from "clsx";
import Avatar from "@/components/ui/Avatar";
import { TChatMessageProps } from "@/types/chat.types";

const ChatMessage = ({ type, pic, name, time, message }: TChatMessageProps) => {
  const typeClass = clsx(
    "chat dropdown dropdown-bottom",
    type === "received" ? "chat-start" : "chat-end"
  );

  const colorClass = clsx(
    "chat-bubble shadow-sm rounded-[0.8rem]",
    type === "received" ? "bg-primary text-primary-content" : "bg-base-200"
  );

  return (
    <article className={typeClass}>
      <div className="chat-image avatar">
        <Avatar pic={pic} sizeClass="w-10" />
      </div>
      <section className="chat-header">
        {name}
        <time className="text-xs opacity-50">{time}</time>
      </section>
      <button className={colorClass} tabIndex={0}>
        {message}
      </button>

      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-200 rounded-box z-1 p-2 shadow-sm"
      >
        <li>
          <button>Edit message</button>
        </li>
        <li>
          <button>Delete message</button>
        </li>
      </ul>
    </article>
  );
};

export default ChatMessage;
