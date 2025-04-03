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
  id: string;
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
  content: string;
  timestamp: Date;
};

export type TChatMember = {
  username: string;
  firstName: string;
  lastName: string;
  chatPic: string;
};

export type TChat = {
  messages: TChatMessage[];
  members: TChatMember[];
};

export type TPreviewChat = {
  id: string;
  chatName: string;
  chatPic: string;
  lastMessage: TChatMessage;
  timestamp: Date;
};

export type TChatState = {
  selectedChatId: string | null;
  selectedChatData: TChat | null;
  selectedChatPreviewData: TPreviewChat | null;
  chatPreviewArray: TPreviewChat[] | null;
};

export type TChatActions = {
  setSelectedChatId: (selectedId: string | null) => void;
  setSelectedChatData: () => void;
  setSelectedChatPreviewData: () => void;
};
