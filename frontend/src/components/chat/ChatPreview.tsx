import clsx from "clsx";
import Avatar from "@/components/ui/Avatar";
import { useChatStore } from "@/store/useChatStore";
import { TChatPreviewProps } from "@/types/chat.types";

const ChatPreview = ({
  id,
  pic,
  title,
  message,
  action,
}: TChatPreviewProps) => {
  const { selectedChatId } = useChatStore();
  return (
    <button
      type="button"
      onClick={action}
      className={clsx(
        "flex text-left rounded-[1rem] hover:bg-base-300 mx-2 my-1 p-3 cursor-pointer",
        id === selectedChatId ? "bg-base-300" : ""
      )}
    >
      <Avatar pic={pic} sizeClass="w-10 mr-2" />
      <section className="w-5/6 mr-3">
        <h4 className="leading-none font-semibold mb-1 truncate text-base-content">
          {title}
        </h4>
        <p className="leading-none font-light text-sm  truncate">
          {message === "" ? "No messages" : message}
        </p>
      </section>
    </button>
  );
};

export default ChatPreview;
