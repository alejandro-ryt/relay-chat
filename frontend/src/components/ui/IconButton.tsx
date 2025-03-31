import { ReactNode } from "react";

interface IconButtonProps {
  icon: ReactNode;
  action: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const IconButton = ({ icon, action }: IconButtonProps) => {
  return (
    <button
      className="btn btn-square w-24 h-24 mx-3 my-0.5 bg-transparent border-none hover:bg-primary"
      onClick={action}
    >
      {icon}
    </button>
  );
};

export default IconButton;
