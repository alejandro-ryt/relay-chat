import { ReactNode } from "react";

interface IconButtonProps {
  icon: ReactNode;
  title: string;
  action: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const IconButton = ({ icon, title, action }: IconButtonProps) => {
  return (
    <button
      className="flex flex-col btn btn-square w-18 h-18 m-0.5 bg-transparent border-none rounded-[1.2rem] hover:bg-base-300 text-base-content"
      onClick={action}
    >
      {icon}
      <p> {title}</p>
    </button>
  );
};

export default IconButton;
