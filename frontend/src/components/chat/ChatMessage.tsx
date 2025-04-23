import clsx from "clsx";
import Avatar from "@/components/ui/Avatar";
import { TChatMessageProps } from "@/types/chat.types";
import TriangleWarning from "@/components/ui/icons/TriangleWarning";
import { useDeleteMessageMutation } from "@/services/chat.service";
import toast from "react-hot-toast";
import { getApiError } from "@/utils";
import { useEffect, useState } from "react";
import DATA from "@/constants/notFound";
import { useChatStore } from "@/store/useChatStore";

const ChatMessage = ({
  id,
  type,
  pic,
  name,
  time,
  message,
  deletedAt,
  updatedAt,
}: TChatMessageProps) => {
  const deleteMessage = useDeleteMessageMutation();
  const [isDeleted, setIsDeleted] = useState(deletedAt);
  const { setIsMessageEdited, setMessageToEdit } = useChatStore();

  const typeClass = clsx(
    "chat dropdown dropdown-bottom",
    type === "received" ? "chat-start" : "chat-end"
  );

  const colorClass = clsx(
    "chat-bubble shadow-sm rounded-[0.8rem]",
    type === "received" ? "bg-primary text-primary-content" : "bg-base-200"
  );

  const handleDeleteMessage = () => {
    deleteMessage.mutate(id);
  };

  const handleEditMessage = () => {
    setIsMessageEdited(true);
    setMessageToEdit({
      id,
      type,
      pic,
      name,
      time,
      message,
      deletedAt,
      updatedAt,
    });
  };

  useEffect(() => {
    if (deleteMessage.error) {
      toast.error(getApiError(deleteMessage.error) ?? DATA.API_ERROR);
    }

    if (deleteMessage.data) {
      setIsDeleted(new Date());
    }
  }, [deleteMessage.data, deleteMessage.error]);

  return (
    <article className={typeClass}>
      <div className="chat-image avatar">
        <Avatar pic={pic} sizeClass="w-10" />
      </div>
      <section className="chat-header">
        {name}
        <time className="text-xs opacity-50">{time}</time>
      </section>
      {isDeleted ? (
        <button
          disabled
          className={`${colorClass} flex flex-row justify-between`}
        >
          <TriangleWarning /> <p className="ml-2">This message was deleted.</p>
        </button>
      ) : (
        <button className={colorClass} tabIndex={0}>
          {message}
        </button>
      )}

      {type === "sent" && (
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-200 rounded-box z-1 p-2 shadow-sm"
        >
          <li>
            <button onClick={() => handleEditMessage()}>Edit message</button>
          </li>
          <li>
            <button onClick={() => handleDeleteMessage()}>
              Delete message
            </button>
          </li>
        </ul>
      )}
    </article>
  );
};

export default ChatMessage;
