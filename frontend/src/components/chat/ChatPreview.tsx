import Avatar from "@/components/ui/Avatar";
import { useChatStore } from "@/store/useChatStore";
import { TChatPreviewProps } from "@/types/chat.types";
import clsx from "clsx";

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
      onClick={action}
      className={clsx(
        "flex text-left rounded-[1rem] hover:bg-base-300 mx-5 my-3 p-3 cursor-pointer",
        id === selectedChatId ? "bg-base-300" : ""
      )}
    >
      <Avatar pic={pic} sizeClass="w-10 mr-2" />
      <section className="w-5/6 mr-3">
        <h4 className="leading-none font-bold mb-1">{title}</h4>
        <p className="text-sm leading-none">{message}</p>
      </section>
    </button>
  );
};

export default ChatPreview;
