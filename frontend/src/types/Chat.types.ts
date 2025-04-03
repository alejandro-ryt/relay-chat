import { ReactNode } from "react";

export type TAvatarProps = {
  pic: string;
  sizeClass: string;
};

export type TChatMessageProps = {
  type: "received" | "sent";
  pic: string;
  name: string;
  time: string;
  message: string;
};

export type TChatPreviewProps = {
  pic: string;
  title: string;
  message: string;
  action: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export type TContactCardProps = {
  pic: string;
  name: string;
};

export type TIconButtonProps = {
  icon: ReactNode;
  shape: "round" | "squircle";
  title?: string;
  action: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export type TRecentChatsProps = {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TChatMessage = {
  username: string;
  message: string;
  timestamp: Date;
};

export type TChatMember = {
  username: string;
  firstName: string;
  lastName: string;
  profilePic: string;
};

export type TChat = {
  messages: TChatMessage[];
  members: TChatMember[];
};

export type TPreviewChat = {
  chatId: string;
  chatName: string;
  profilePic: string;
  lastMessage: string;
  timestamp: Date;
};

export type TChatState = {
  selectedChatId: string | null;
  selectedChatData: TChat | null;
  selectedChatPreviewData: TPreviewChat | null;
  chatPreviewArray: TPreviewChat[] | null;
};

export type TChatActions = {
  setSelectedChatId: (selectedChatId: string | null) => void;
  setSelectedChatData: () => void;
  setSelectedChatPreviewData: () => void;
};
