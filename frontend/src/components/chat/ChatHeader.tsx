import IconButton from "@/components/ui/IconButton";
import VerticalDotsIcon from "@/components/ui/icons/VerticalDotsIcon";
import { useCurrentChatState } from "@/store/useChat";
import { TRecentChatsProps } from "@/types/chat.types";

const ChatHeader = ({ showSidebar, setShowSidebar }: TRecentChatsProps) => {
  const { selectedChatData, selectedChatPreviewData } = useCurrentChatState();

  return (
    <section className="flex flex-row justify-between items-center mb-6">
      <div role="group" className="flex flex-col">
        <h1 className="text-2xl font-bold">
          {selectedChatPreviewData?.chatName}
        </h1>
        <p className="text-sm">{selectedChatData?.members.length} members</p>
      </div>

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
