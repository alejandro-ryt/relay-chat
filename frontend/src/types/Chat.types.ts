import { ReactNode } from "react";
import { Socket } from "socket.io-client";

export type TAvatarProps = {
  pic: string | undefined;
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
  _id: string;
  author: string;
  username: string;
  message: string;
  createdAt: Date;
};

export type TChatMember = {
  _id: string;
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
  setSelectedChatPreviewData: (
    userId: string,
    data: TPreviewChat[] | null
  ) => void;
  connectToChat: (userId: string) => void;
  sendMessage: (message: string, userId: string) => void;
  getMessage: () => void;
};
