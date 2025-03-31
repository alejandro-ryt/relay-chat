import Avatar from "@/components/ui/Avatar";
import IconButton from "@/components/ui/IconButton";
import ChatIcon from "@/assets/ChatIcon";

const Chat = () => {
  return (
    <section className="grid grid-cols-12 grid-rows-10 gap-1 h-full rounded-[1.5rem]">
      <section className="row-span-10 flex flex-col w-full h-full items-center py-6">
        <Avatar />

        <div role="group">
          <IconButton icon={<ChatIcon />} action={() => console.log("test")} />
          <IconButton icon={<ChatIcon />} action={() => console.log("test")} />
          <IconButton icon={<ChatIcon />} action={() => console.log("test")} />
          <IconButton icon={<ChatIcon />} action={() => console.log("test")} />
        </div>
      </section>
      <section className="col-span-2 row-span-10">8</section>
      <section className="col-span-9 row-span-10 col-start-4">9</section>
    </section>
  );
};

export default Chat;
