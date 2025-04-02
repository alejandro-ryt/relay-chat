import { IconButtonProps } from "@/types/Chat.types";

const IconButton = ({ icon, shape, title, action }: IconButtonProps) => {
  if (shape === "squircle") {
    return (
      <button
        className="flex flex-col btn mask mask-squircle w-18 h-18 m-0.5 bg-transparent border-none hover:bg-base-300 text-base-content"
        onClick={action}
      >
        {icon}
        <p className="text-xs"> {title ? title : null}</p>
      </button>
    );
  }

  if (shape === "round") {
    return (
      <button
        className="flex justify-center items-center cursor-pointer w-8 h-8 hover:bg-base-300 rounded-full"
        onClick={action}
      >
        {icon}
      </button>
    );
  }
};

export default IconButton;
