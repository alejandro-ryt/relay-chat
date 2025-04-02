import { useState } from "react";
import Avatar from "@/components/ui/Avatar";
import IconButton from "@/components/ui/IconButton";
import ChatIcon from "@/components/ui/icons/ChatIcon";
import FriendsIcon from "@/components/ui/icons/FriendsIcon";
import LogoutIcon from "@/components/ui/icons/LogoutIcon";
import SearchInput from "@/components/ui/SearchInput";
import ChatPreview from "@/components/ui/ChatPreview";
import ChatBox from "@/components/ui/ChatBox";
import ArrowIcon from "@/components/ui/icons/ArrowIcon";
import { motion } from "motion/react";

const Chat = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <section className="relative flex flex-row xl:max-w-[65vw] w-full min-h-[75vh] rounded-[1.5rem]">
      <aside className="flex flex-col w-24 h-full items-center justify-between pt-4 pb-2">
        <Avatar
          pic="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          sizeClass="w-16"
        />

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
          action={() => {}}
        />
      </aside>
      <motion.section
        className="absolute right-0 bottom-0 top-0 bg-base-100 flex flex-1 min-h-auto rounded-[1.5rem] m-2"
        animate={{
          width: !showSidebar
            ? "calc(100% - var(--spacing) * 26)"
            : "calc(100% - var(--spacing) * 4)",
        }}
        transition={{ duration: 0.2 }}
      >
        <section className="flex flex-col max-w-72 ">
          <SearchInput />

          <section className="flex flex-col flex-1">
            <ChatPreview
              pic="https://picsum.photos/200"
              title="Julio Cesar"
              message="Que mae como va con esa interfaz?"
            />

            <ChatPreview
              pic="https://picsum.photos/200"
              title="Jorge De LaSelva"
              message="Ya termine el backend bro, para cuando el cod?"
            />
          </section>
          <section className="flex m-8 ml-5">
            <motion.div
              role="button"
              initial={{ rotate: 180 }}
              animate={{
                rotate: showSidebar ? 180 : 0,
              }}
              transition={{ duration: 0.2 }}
            >
              <IconButton
                shape="round"
                title="Contacts"
                icon={<ArrowIcon />}
                action={() => setShowSidebar(!showSidebar)}
              />
            </motion.div>
          </section>
        </section>
        <ChatBox />
      </motion.section>
    </section>
  );
};

export default Chat;
