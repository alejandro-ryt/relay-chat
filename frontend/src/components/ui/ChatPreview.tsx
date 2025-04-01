import Avatar from "@/components/ui/Avatar";

interface ChatPreviewProps {
  pic: string;
  title: string;
  message: string;
}

const ChatPreview = ({ pic, title, message }: ChatPreviewProps) => {
  return (
    <article className="flex rounded-[1rem] hover:bg-base-300 mx-5 mb-3 p-3 cursor-pointer">
      <Avatar pic={pic} sizeClass="w-10 mr-2" />
      <section className="w-5/6 mr-3">
        <h4 className="leading-none font-bold mb-1">{title}</h4>
        <p className="text-sm leading-none">{message}</p>
      </section>
    </article>
  );
};

export default ChatPreview;
