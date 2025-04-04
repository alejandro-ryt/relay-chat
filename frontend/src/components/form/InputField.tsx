import { TInputFieldProps } from "@/types/form.types";
import { FC, useState } from "react";
import { EyeClosedIcon } from "../ui/icons/EyeCloseIcon";
import { EyeOpenIcon } from "../ui/icons/EyeOpenIcon";

export const InputField: FC<TInputFieldProps> = ({
  type = "text",
  className = "input input-bordered w-full",
  legend,
  error,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{legend}</legend>
      {type === "password" ? (
        <section className="relative">
          <input
            type={showPassword ? "text" : type}
            className={className}
            {...rest}
          />
          <button
            type="button"
            onClick={togglePassword}
            className="btn btn-circle btn-ghost btn-sm absolute right-0 bottom-0 mr-2 mb-1"
          >
            {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
          </button>
        </section>
      ) : (
        <input type={type} className={className} {...rest} />
      )}
      {error ? <p className="fieldset-label text-error">{error}</p> : null}
    </fieldset>
  );
};
