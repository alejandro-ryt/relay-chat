import { Server, Socket } from "socket.io";
import * as chatController from "@/controllers/chatController";
import { assignSocketIdByUserId } from "@/controllers/userController";

export const handleSocketEvents = (io: Server, socket: Socket) => {
  /**
   * Initiate socket connection and assign socket.id to the user
     and look up for pending chats invites
   */
  socket.on("initiateSocket", async (userId: string) => {
    await assignSocketIdByUserId(userId, socket);
    console.log(`User connected: ${socket.id}`);
  });

  // Handle 'joinChat' event
  socket.on(
    "joinChat",
    async (
      chatName: string,
      type: "direct" | "group",
      currentUserId: string,
      membersIds: string[]
    ) => {
      await chatController.joinChat(
        io,
        socket,
        chatName,
        type,
        currentUserId,
        membersIds
      );
    }
  );

  // Handle 'sendMessage' event
  socket.on(
    "sendMessage",
    async (
      message: string,
      chatId: string,
      userId: string,
      membersIds: string[],
      messageId?: string
    ) => {
      await chatController.sendMessage(
        io,
        socket,
        message,
        chatId,
        userId,
        membersIds,
        messageId
      );
    }
  );

  // Handle 'disconnect' event
  socket.on("disconnect", () => {
    chatController.handleDisconnect(socket);
  });
};
