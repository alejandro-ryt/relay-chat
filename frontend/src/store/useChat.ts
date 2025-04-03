import { create } from "zustand";
import { TChatState, TChatActions } from "@/types/chat.types";

// Using mock data while integrating API
const mockPreviewData = [
  {
    id: "131234124124123",
    chatName: "Julio Merlo",
    chatPic: "https://picsum.photos/200",
    lastMessage: {
      content: "Que mae como va con esa interfaz?",
      username: "juliocesar",
      timestamp: new Date(),
    },
    timestamp: new Date(),
  },
  {
    id: "214114124141242",
    chatName: "Jorge Gomez",
    chatPic: "https://picsum.photos/300",
    lastMessage: {
      content: "Ya termine el backend bro, para cuando el cod?",
      username: "jorgeelcurioso",
      timestamp: new Date(),
    },
    timestamp: new Date(),
  },
  {
    id: "214124124214214",
    chatName: "John Smith",
    chatPic: "https://picsum.photos/400",
    lastMessage: {
      content: "Lorem Ipsum, Lorem Ipsum, Lorem Ipsum, Lorem Ipsum!",
      username: "johnsalchichon",
      timestamp: new Date(),
    },
    timestamp: new Date(),
  },
];

// Using mock data while integrating API
const mockChatsArray = [
  {
    id: "131234124124123",
    messages: [
      {
        content: "Que mae como va con esa interfaz?",
        username: "juliocesar",
        timestamp: new Date(),
      },
      {
        content:
          "Mae ya casi termino de hecho, el responsive va a estar divertido jaja lol xd",
        username: "alejandromagno",
        timestamp: new Date(),
      },
      {
        content: "Mae ya termine!",
        username: "alejandromagno",
        timestamp: new Date(),
      },
    ],
    members: [
      {
        username: "juliocesar",
        firstName: "Julio",
        lastName: "Merlo",
        chatPic: "https://picsum.photos/200",
      },
      {
        username: "alejandromagno",
        firstName: "Alejandro",
        lastName: "Solano",
        chatPic: "https://picsum.photos/500",
      },
    ],
  },
  {
    id: "214114124141242",
    messages: [
      {
        content: "Ya termine el backend bro, para cuando el cod?",
        username: "jorgeelcurioso",
        timestamp: new Date(),
      },
      {
        content: "Ahorita que termine de implementar esto bro",
        username: "alejandromagno",
        timestamp: new Date(),
      },
    ],
    members: [
      {
        username: "jorgeelcurioso",
        firstName: "Jorge",
        lastName: "Gomez",
        chatPic: "https://picsum.photos/300",
      },
      {
        username: "alejandromagno",
        firstName: "Alejandro",
        lastName: "Solano",
        chatPic: "https://picsum.photos/500",
      },
    ],
  },
  {
    id: "214124124214214",
    messages: [
      {
        content: "Hello there!",
        username: "johnsalchichon",
        timestamp: new Date(),
      },
      {
        content: "General Kenobi!",
        username: "alejandromagno",
        timestamp: new Date(),
      },
    ],
    members: [
      {
        username: "johnsalchichon",
        firstName: "John",
        lastName: "S",
        chatPic: "https://picsum.photos/400",
      },
      {
        username: "alejandromagno",
        firstName: "Alejandro",
        lastName: "Solano",
        chatPic: "https://picsum.photos/500",
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

    // Set Chat id
    setSelectedChatId: (selectedChatId: string | null) => {
      set({
        selectedChatId,
      });
    },

    // Set Chat Data
    setSelectedChatData: () => {
      const found = mockChatsArray.find(
        (foundChat) => foundChat.id === get().selectedChatId
      );

      set({
        selectedChatData: found,
      });
    },

    // Set Chat Data
    setSelectedChatPreviewData: () => {
      const found = mockPreviewData.find(
        (foundChat) => foundChat.id === get().selectedChatId
      );

      set({
        selectedChatPreviewData: found,
      });
    },
  })
);
