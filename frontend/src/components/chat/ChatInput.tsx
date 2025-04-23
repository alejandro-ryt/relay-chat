import { useEffect, useRef } from "react";
import IconButton from "@/components/ui/IconButton";
import SendIcon from "@/components/ui/icons/SendIcon";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";

const ChatInput = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const {
    sendMessage,
    chatPreviewArray,
    selectedChatId,
    isMessageEdited,
    setIsMessageEdited,
    messageToEdit,
  } = useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.minHeight = "auto";
      inputRef.current.style.minHeight = inputRef.current.scrollHeight + "px";
    }
  }, []);

  useEffect(() => {
    if (inputRef.current && isMessageEdited && messageToEdit) {
      inputRef.current.value = messageToEdit.message;
      inputRef.current.focus();
    }
  }, [isMessageEdited, messageToEdit]);

  const handleInput = () => {
    if (inputRef.current) {
      inputRef.current.style.minHeight = "auto";
      inputRef.current.style.minHeight =
        inputRef.current.scrollHeight < 250
          ? inputRef.current.scrollHeight + "px"
          : "250px";
    }
  };

  const handleSent = () => {
    if (isMessageEdited && messageToEdit && inputRef.current) {
      sendMessage(
        inputRef.current.value,
        authUser?.userId || "",
        messageToEdit.id
      );
      inputRef.current.value = ""; // Clear the input after sending the message
      handleInput();

      setIsMessageEdited(false);
    } else {
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
    }
  };

  return (
    <label className="flex flex-row justify-center items-center h-10 m-4">
      <textarea
        ref={inputRef}
        id="chatInput"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // Prevent the default behavior of the Enter key
            handleSent();
          }
        }}
        className="textarea textarea-bordered w-full resize-none max-h-82 p-3 rounded-[0.8rem]"
        rows={1}
        placeholder="Your message"
        onInput={handleInput}
      />
      <IconButton
        id="sendButton"
        icon={<SendIcon />}
        shape="round"
        action={() => handleSent()}
      />
    </label>
  );
};

export default ChatInput;
