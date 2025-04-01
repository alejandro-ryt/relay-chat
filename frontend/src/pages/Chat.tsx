import Avatar from "@/components/ui/Avatar";
import IconButton from "@/components/ui/IconButton";
import ChatIcon from "@/components/ui/icons/ChatIcon";
import FriendsIcon from "@/components/ui/icons/FriendsIcon";
import LogoutIcon from "@/components/ui/icons/LogoutIcon";
import SearchInput from "@/components/ui/SearchInput";
import ChatPreview from "@/components/ui/ChatPreview";
import ChatBox from "@/components/ui/ChatBox";

const Chat = () => {
  return (
    <section className="flex flex-row h-full rounded-[1.5rem] drawer drawer-end">
      <section className="flex flex-col w-24 h-full items-center justify-between pt-4 pb-2">
        <Avatar
          pic="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          sizeClass="w-16"
        />

        <div role="group" className="flex flex-col items-center w-full">
          <IconButton title="All Chats" icon={<ChatIcon />} action={() => {}} />
          <IconButton
            title="Contacts"
            icon={<FriendsIcon />}
            action={() => {}}
          />
        </div>
        <IconButton title="Logout" icon={<LogoutIcon />} action={() => {}} />
      </section>
      <section className="bg-base-100 flex w-full rounded-[1.5rem] m-2">
        <section className="flex flex-col max-w-72 ">
          <SearchInput />

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
        <ChatBox />
      </section>
    </section>
  );
};

export default Chat;
