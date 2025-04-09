import socket from "@/socket/socket";
import {
  TChatActions,
  TChatMessage,
  TChatState,
  TPreviewChat,
} from "@/types/chat.types";
import { create } from "zustand";

export const useChatStore = create<TChatState & TChatActions>((set, get) => ({
  selectedChatId: null,
  selectedChatData: null,
  selectedChatPreviewData: null,
  chatPreviewArray: [],

  // Set Chat id
  setSelectedChatId: (selectedChatId: string | null) => {
    set({
      selectedChatId,
    });
  },

  // Set Chat Data
  setSelectedChatData: () => {
    if (socket) {
      socket.on("chatData", (chatData: any) => {
        set({
          selectedChatData: chatData,
        });
      });
    }
  },

  // Set Chat Data
  setSelectedChatPreviewData: (userId: string, data: TPreviewChat[] | null) => {
    const found = data?.find(
      (foundChat) => foundChat.id === get().selectedChatId
    );

    // Set the chat preview data in the store
    set({
      chatPreviewArray: data,
    });

    // Set the selected chat preview data in the store
    set({
      selectedChatPreviewData: found,
    });

    // Connect to chat after setting the preview data
    if (found) {
      get().connectToChat(userId);
    }
  },

  // Connect to chat
  connectToChat: (userId: string) => {
    let membersIds: string[] = [];

    get().selectedChatData?.members.forEach((member) => {
      member._id !== userId ? membersIds.push(member._id) : null;
    });

    if (socket && userId) {
      socket.emit(
        "joinChat",
        get().selectedChatPreviewData?.chatName,
        "group",
        userId,
        membersIds
      ); // Emit event to server to join the room
    } else {
      console.error("Socket is null. Unable to join chat.");
    }
  },

  // Send Messsage
  sendMessage: (message: string, userId) => {
    if (socket) {
      socket.emit(
        "sendMessage",
        message,
        get().selectedChatPreviewData?.chatName,
        userId
      ); // Emit event to server to send the message

      get().setSelectedChatData(); // Update chat data after sending the message
    } else {
      console.error("Socket is null. Unable to send message.");
    }
  },

  // Get Messsages
  getMessage: () => {
    try {
      if (socket) {
        socket.on("sendMessage", (msg: TChatMessage) => {
          const existingMessage = get().selectedChatData?.messages.find(
            (message) => message._id === msg._id
          );
          if (!existingMessage) {
            get().selectedChatData?.messages.push(msg); // Push the message to the chat data if it's not a duplicate
          }
          const chatData = get().selectedChatData;
          set({
            selectedChatData: chatData,
          });
        });
      } else {
        console.error("Socket is null. Unable to get messages.");
      }
    } catch (error) {
      console.error("Error while getting messages:", error);
    }
  },

  joinChat: (data) => {
    try {
      if (socket) {
        socket.emit(
          "joinChat",
          data.chatName,
          data.type,
          data.currentUserId,
          data.membersIds
        );
        return true;
      }
      console.error("Socket is null. Unable to joinChat.");
      return false;
    } catch (error) {
      console.error("Error while joinChat:", error);
      return false;
    }
  },

  // Reset Data
  resetData: () => {
    set({
      selectedChatId: null,
      selectedChatData: null,
      selectedChatPreviewData: null,
      chatPreviewArray: [],
    });
  },
}));
