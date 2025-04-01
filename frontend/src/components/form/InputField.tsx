import React, { InputHTMLAttributes } from "react";

type InputFieldProps = {
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "className">;

export const InputField: React.FC<InputFieldProps> = ({
  type = "text",
  className = "input input-bordered input-primary",
  ...rest
}) => {
  return <input type={type} className={className} {...rest} />;
};
