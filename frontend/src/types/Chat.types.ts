import { ReactNode } from "react";

type AvatarProps = {
  pic: string;
  sizeClass: string;
};

type ChatMessageProps = {
  type: "received" | "sent";
  pic: string;
  name: string;
  time: string;
  message: string;
};

type ChatPreviewProps = {
  pic: string;
  title: string;
  message: string;
};

type ContactCardProps = {
  pic: string;
  name: string;
};

type IconButtonProps = {
  icon: ReactNode;
  shape: "round" | "squircle";
  title?: string;
  action: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export type {
  AvatarProps,
  ChatMessageProps,
  ChatPreviewProps,
  ContactCardProps,
  IconButtonProps,
};
