import { useEffect, useRef } from "react";
import IconButton from "@/components/ui/IconButton";
import SendIcon from "@/components/ui/icons/SendIcon";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";

const ChatInput = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { sendMessage, chatPreviewArray, selectedChatId } = useChatStore();
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
    const currentChat = chatPreviewArray?.find(
      (chat) => chat.id === selectedChatId
    );

    if (inputRef.current) {
      const message = inputRef.current.value;
      sendMessage(message, authUser?.userId || ""); // Send the message to the chat with socket.io
      if (currentChat?.lastMessage) {
        currentChat.lastMessage.message = message; // Update the last message in the chat preview array
      }
      inputRef.current.value = ""; // Clear the input after sending the message
      handleInput(); // Reset the height of the textarea
    }
  };

  return (
    <label className="flex flex-row justify-center items-center h-10 m-4">
      <textarea
        ref={inputRef}
        className="textarea textarea-bordered w-full resize-none max-h-82 p-3 rounded-[0.8rem]"
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
