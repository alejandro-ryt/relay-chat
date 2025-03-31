import Avatar from "@/components/ui/Avatar";
import IconButton from "@/components/ui/IconButton";
import ChatIcon from "@/assets/ChatIcon";
import FriendsIcon from "@/assets/FriendsIcon";

const Chat = () => {
  return (
    <section className="grid grid-cols-12 grid-rows-10 gap-1 h-full rounded-[1.5rem]">
      <section className="row-span-10 flex flex-col w-full h-full items-center justify-between pt-6">
        <Avatar />

        <div role="group">
          <IconButton icon={<ChatIcon />} action={() => console.log("test")} />
          <IconButton
            icon={<FriendsIcon />}
            action={() => console.log("test")}
          />
          <IconButton icon={<ChatIcon />} action={() => console.log("test")} />
          <IconButton icon={<ChatIcon />} action={() => console.log("test")} />
        </div>
        <IconButton icon={<ChatIcon />} action={() => console.log("test")} />
      </section>
      <section className="col-span-2 row-span-10">8</section>
      <section className="col-span-9 row-span-10 col-start-4">9</section>
    </section>
  );
};

export default Chat;
