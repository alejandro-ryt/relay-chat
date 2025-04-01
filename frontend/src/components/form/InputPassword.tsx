import { InputHTMLAttributes, useState } from "react";
import { InputField } from "@/components/form/InputField";
import { EyeClosedIcon } from "@/components/ui/icons/EyeCloseIcon";
import { EyeOpenIcon } from "@/components/ui/icons/EyeOpenIcon";

type InputPasswordFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
>;

export const InputPassword = (props: InputPasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div className="relative">
      <InputField type={showPassword ? "text" : "password"} {...props} />
      <button
        type="button"
        onClick={togglePassword}
        className="btn btn-circle btn-ghost btn-sm absolute right-0 bottom-0 mr-2 mb-1"
      >
        {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
      </button>
    </div>
  );
};
