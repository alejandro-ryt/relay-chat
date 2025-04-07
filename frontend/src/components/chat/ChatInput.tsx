import IconButton from "@/components/ui/IconButton";
import SendIcon from "@/components/ui/icons/SendIcon";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";
import { useEffect, useRef } from "react";

const ChatInput = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { sendMessage } = useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.minHeight = "auto";
      inputRef.current.style.minHeight = inputRef.current.scrollHeight + "px";
    }
  }, []);

  const handleInput = () => {
    if (inputRef.current) {
      inputRef.current.style.minHeight = "auto";
      inputRef.current.style.minHeight =
        inputRef.current.scrollHeight < 250
          ? inputRef.current.scrollHeight + "px"
          : "250px";
    }
  };

  const handleMessage = () => {
    if (inputRef.current) {
      const message = inputRef.current.value;
      sendMessage(message, authUser?.userId || ""); // Send the message to the chat with socket.io
      inputRef.current.value = ""; // Clear the input after sending the message
      handleInput(); // Reset the height of the textarea
    }
  };

  return (
    <label className="flex flex-row justify-center items-center m-4 mb-1">
      <textarea
        ref={inputRef}
        className="textarea textarea-bordered w-full resize-none max-h-82 m-2 p-3 rounded-[0.8rem]"
        rows={1}
        placeholder="Your message"
        onInput={handleInput}
      />
      <IconButton
        icon={<SendIcon />}
        shape="round"
        action={() => handleMessage()}
      />
    </label>
  );
};

export default ChatInput;
