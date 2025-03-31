import { ReactNode } from "react";

interface IconButtonProps {
  icon: ReactNode;
  action: CallableFunction;
}

const IconButton = ({ icon, action }: IconButtonProps) => {
  return (
    <button className="btn btn-square m-8" onClick={() => action}>
      {icon}
    </button>
  );
};

export default IconButton;
