import { create } from "zustand";
import { TChatState, TChatActions } from "@/types/chat.types";

const mockPreviewData = [
  {
    chatId: "131234124124123",
    chatName: "Julio Merlo",
    profilePic: "https://picsum.photos/200",
    lastMessage: "Que mae como va con esa interfaz?",
    timestamp: new Date(),
  },
  {
    chatId: "214114124141242",
    chatName: "Jorge Gomez",
    profilePic: "https://picsum.photos/300",
    lastMessage: "Ya termine el backend bro, para cuando el cod?",
    timestamp: new Date(),
  },
  {
    chatId: "214124124214214",
    chatName: "John Smith",
    profilePic: "https://picsum.photos/400",
    lastMessage: "Lorem Ipsum, Lorem Ipsum, Lorem Ipsum, Lorem Ipsum!",
    timestamp: new Date(),
  },
];

const mockChatsArray = [
  {
    chatId: "131234124124123",
    messages: [
      {
        username: "juliocesar",
        message: "Que mae como va con esa interfaz?",
        timestamp: new Date(),
      },
      {
        username: "alejandromagno",
        message:
          "Mae ya casi termino de hecho, el responsive va a estar divertido jaja lol xd",
        timestamp: new Date(),
      },
      {
        username: "alejandromagno",
        message: "Mae ya termine!",
        timestamp: new Date(),
      },
    ],
    members: [
      {
        username: "juliocesar",
        firstName: "Julio",
        lastName: "Merlo",
        profilePic: "https://picsum.photos/200",
      },
      {
        username: "alejandromagno",
        firstName: "Alejandro",
        lastName: "Solano",
        profilePic: "https://picsum.photos/500",
      },
    ],
  },
  {
    chatId: "214114124141242",
    messages: [
      {
        username: "jorgeelcurioso",
        message: "Ya termine el backend bro, para cuando el cod?",
        timestamp: new Date(),
      },
      {
        username: "alejandromagno",
        message: "Ahorita que termine de implementar esto bro",
        timestamp: new Date(),
      },
    ],
    members: [
      {
        username: "jorgeelcurioso",
        firstName: "Jorge",
        lastName: "Gomez",
        profilePic: "https://picsum.photos/300",
      },
      {
        username: "alejandromagno",
        firstName: "Alejandro",
        lastName: "Solano",
        profilePic: "https://picsum.photos/500",
      },
    ],
  },
  {
    chatId: "214124124214214",
    messages: [
      {
        username: "johnsalchichon",
        message: "Hello there!",
        timestamp: new Date(),
      },
      {
        username: "alejandromagno",
        message: "General Kenobi!",
        timestamp: new Date(),
      },
    ],
    members: [
      {
        username: "johnsalchichon",
        firstName: "John",
        lastName: "S",
        profilePic: "https://picsum.photos/400",
      },
      {
        username: "alejandromagno",
        firstName: "Alejandro",
        lastName: "Solano",
        profilePic: "https://picsum.photos/500",
      },
    ],
  },
];

export const useCurrentChatState = create<TChatState & TChatActions>(
  (set, get) => ({
    selectedChatId: null,
    selectedChatData: null,
    selectedChatPreviewData: null,
    chatPreviewArray: mockPreviewData,

    // Set Chat Id
    setSelectedChatId: (selectedChatId: string | null) => {
      set({
        selectedChatId,
      });
    },

    // Set Chat Data
    setSelectedChatData: () => {
      const found = mockChatsArray.find(
        (foundChat) => foundChat.chatId === get().selectedChatId
      );

      set({
        selectedChatData: found,
      });
    },

    // Set Chat Data
    setSelectedChatPreviewData: () => {
      const found = mockPreviewData.find(
        (foundChat) => foundChat.chatId === get().selectedChatId
      );

      set({
        selectedChatPreviewData: found,
      });
    },
  })
);
