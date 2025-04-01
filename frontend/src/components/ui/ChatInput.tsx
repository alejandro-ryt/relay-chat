import SendIcon from "@/components/ui/icons/SendIcon";
import { useRef, useEffect } from "react";

const ChatInput = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

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

  return (
    <label className="flex flex-row m-4 mb-1">
      <textarea
        ref={inputRef}
        className="textarea textarea-bordered w-full resize-none max-h-82 m-2 p-3 rounded-[0.8rem]"
        rows={1}
        placeholder="Your message"
        onInput={handleInput}
      />
      <button type="submit">
        <SendIcon />
      </button>
    </label>
  );
};

export default ChatInput;
