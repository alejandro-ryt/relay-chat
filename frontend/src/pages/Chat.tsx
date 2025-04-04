import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Avatar from "@/components/ui/Avatar";
import IconButton from "@/components/ui/IconButton";
import ChatIcon from "@/components/ui/icons/ChatIcon";
import FriendsIcon from "@/components/ui/icons/FriendsIcon";
import LogoutIcon from "@/components/ui/icons/LogoutIcon";
import ChatBox from "@/components/chat/ChatBox";
import RecentChats from "@/components/chat/RecentChats";
import { useCurrentChatState } from "@/store/useChat";
import { useAuth } from "@/hooks/useAuth";
import { useUserStore } from "@/store/useUserStore";
import EditProfile from "@/components/chat/EditProfile";
import { useUser } from "@/hooks/useUser";

const Chat = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { logout } = useAuth();
  const { user } = useUserStore();
  const { showModal } = useUser();
  const {
    selectedChatId,
    selectedChatData,
    setSelectedChatData,
    setSelectedChatPreviewData,
  } = useCurrentChatState();

  useEffect(() => {
    setSelectedChatData();
    setSelectedChatPreviewData();
  }, [
    selectedChatId,
    selectedChatData,
    setSelectedChatData,
    setSelectedChatPreviewData,
  ]);

  return (
    <section className="relative flex flex-row xl:max-w-[65vw] w-full min-h-[75vh] rounded-[1.5rem]">
      {/* Sidebar */}
      <aside className="flex flex-col w-24 h-full items-center justify-between pt-4 pb-2">
        <div className="dropdown dropdown-start">
          <div
            tabIndex={0}
            role="button"
            className="btn block mask h-full w-full mask-squircle"
          >
            <Avatar pic={user?.profilePic} sizeClass="w-16" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <li>
              <button onClick={showModal}>Edit Profile</button>
            </li>
            <li>
              <a>Themes coming soon...</a>
            </li>
          </ul>
        </div>
        <EditProfile />

        <div role="group" className="flex flex-col items-center w-full">
          <IconButton
            shape="squircle"
            title="Chats"
            icon={<ChatIcon />}
            action={() => {}}
          />
          <IconButton
            shape="squircle"
            title="Contacts"
            icon={<FriendsIcon />}
            action={() => {}}
          />
        </div>
        <IconButton
          shape="squircle"
          title="Logout"
          icon={<LogoutIcon />}
          action={logout}
        />
      </aside>

      {/* Chat Container */}
      <motion.section
        className="absolute right-0 bottom-0 top-0 bg-base-100 flex flex-1 min-h-auto rounded-[1.5rem] m-2"
        animate={{
          width: !showSidebar
            ? "calc(100% - var(--spacing) * 26)"
            : "calc(100% - var(--spacing) * 4)",
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Recent Chats */}
        <RecentChats
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />

        {/* Chat Box */}
        {selectedChatId ? <ChatBox /> : <section>Start a Chat</section>}
      </motion.section>
    </section>
  );
};

export default Chat;
