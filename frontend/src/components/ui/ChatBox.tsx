import { useState } from "react";
import { motion } from "motion/react";
import ChatInput from "@/components/ui/ChatInput";
import VerticalDotsIcon from "@/components/ui/icons/VerticalDotsIcon";
import ChatMessage from "@/components/ui/ChatMessage";
import ContactCard from "@/components/ui/ContactCard";

const ChatBox = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <section className="relative flex flex-row w-full h-auto m-4">
      <section className="flex flex-col w-full h-full">
        {/* Header of the ChatBox */}
        <section className="flex flex-row justify-between items-center mb-6">
          <div role="group" className="flex flex-col">
            <h1 className="text-2xl font-bold">Design Chat</h1>
            <p className="text-sm">23 members</p>
          </div>
          <button
            className="flex justify-center items-center cursor-pointer w-8 h-8 hover:bg-base-300 rounded-full"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <VerticalDotsIcon />
          </button>
        </section>
        {/* Chat History */}
        <section className="flex-1">
          <ChatMessage
            type="received"
            name="Obi-Wan Kenobi"
            pic="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            time="12:45"
            message="You were the Chosen One!"
          />
          <ChatMessage
            type="sent"
            name="Anakin"
            pic="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            time="12:46"
            message="I hate you!"
          />
        </section>
        {/* Message Input */}
        <section className="w-full">
          <ChatInput />
        </section>
      </section>

      {/* Sidebar */}
      <motion.section
        className="flex flex-col p-4 ml-4 mr-[-1rem] mt-[-1rem] mb-[-1rem] bg-base-200"
        initial={{ width: "0rem", opacity: 0 }}
        animate={{
          width: showSidebar ? "25rem" : "0rem",
          opacity: showSidebar ? 100 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <h1 className="text-2xl font-bold">Chat Info</h1>
        <p className="text-sm">Members:</p>

        <ContactCard
          pic="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          name="Obi-Wan Kenobi"
        />

        <ContactCard
          pic="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          name="Anakin"
        />
      </motion.section>
    </section>
  );
};

export default ChatBox;

<style></style>;
