import { TCreateChatForm } from "@/schemas/create";
import { InputHTMLAttributes, SyntheticEvent } from "react";

export type TInputFieldProps = {
  legend: string;
  error: string | undefined;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "className">;

export type TPasswordCriteriaProps = {
  password: string;
  confirmPassword: string;
};

export type TSearchInputProps = {
  handleOnchange: (event: SyntheticEvent<HTMLInputElement, Event>) => void;
  value: string;
};

export type TCreateChat = {
  handleOnSubmit: (data: TCreateChatForm) => void;
  contactQuantity: number;
};
