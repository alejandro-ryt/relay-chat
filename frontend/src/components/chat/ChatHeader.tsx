import IconButton from "@/components/ui/IconButton";
import VerticalDotsIcon from "@/components/ui/icons/VerticalDotsIcon";
import { useCurrentChatState } from "@/store/useChatStore";
import { TRecentChatsProps } from "@/types/chat.types";
import Avatar from "../ui/Avatar";

const ChatHeader = ({ showSidebar, setShowSidebar }: TRecentChatsProps) => {
  const { selectedChatData, selectedChatPreviewData } = useCurrentChatState();

  return (
    <section className="flex flex-row justify-between items-center mb-6">
      <section className="flex flex-row">
        <Avatar pic={selectedChatPreviewData?.chatPic} sizeClass="w-16" />
        <section className="flex flex-col ml-2">
          <h1 className="text-2xl font-bold">
            {selectedChatPreviewData?.chatName}
          </h1>
          <p className="text-sm">{selectedChatData?.members.length} members</p>
        </section>
      </section>

      <IconButton
        shape="round"
        title="Contacts"
        icon={<VerticalDotsIcon />}
        action={() => setShowSidebar(!showSidebar)}
      />
    </section>
  );
};

export default ChatHeader;
