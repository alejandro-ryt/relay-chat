import Avatar from "@/components/ui/Avatar";
import { TChatPreviewProps } from "@/types/chat.types";

const ChatPreview = ({ pic, title, message, action }: TChatPreviewProps) => {
  return (
    <button
      onClick={action}
      className="flex text-left rounded-[1rem] hover:bg-base-300 mx-5 mb-3 p-3 cursor-pointer"
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
