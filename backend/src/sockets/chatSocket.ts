import { Server, Socket } from "socket.io";
import * as chatController from "@/controllers/chatController";
import { assignSocketIdByUserId } from "@/controllers/userController";
import { ErrorHandler } from "@/utils/errorHandler";
import { ERROR } from "@/constants/relayChat";
import { StatusCodes } from "http-status-codes";

export const handleSocketEvents = (io: Server, socket: Socket) => {
  /**
   * Initiate socket connection and assign socket.id to the user
     and look up for pending chats invites
   */
  socket.on("initiateSocket", async (userId: string) => {
    await assignSocketIdByUserId(userId, socket);
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
      try {
        await chatController.joinChat(
          io,
          socket,
          chatName,
          type,
          currentUserId,
          membersIds
        );
      } catch (error: unknown) {
        // Handle errors by emitting the error message to the client
        if (error instanceof ErrorHandler) {
          socket.emit("error", {
            message: error.message,
            statusCode: error.statusCode,
          });
          return;
        }
        // General error handling if something else goes wrong
        socket.emit("error", {
          message: ERROR.INTERNAL_SERVICE_ERROR,
          statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        });
      }
    }
  );

  // Handle 'sendMessage' event
  socket.on(
    "sendMessage",
    async (
      message: string,
      chatName: string,
      userId: string,
      membersIds: string[],
      messageId?: string
    ) => {
      try {
        await chatController.sendMessage(
          io,
          socket,
          message,
          chatName,
          userId,
          membersIds
        );
      } catch (error: unknown) {
        // Handle errors by emitting the error message to the client
        if (error instanceof ErrorHandler) {
          socket.emit("error", {
            message: error.message,
            statusCode: error.statusCode,
          });
          return;
        }
        // General error handling if something else goes wrong
        socket.emit("error", {
          message: ERROR.INTERNAL_SERVICE_ERROR,
          statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        });
      }
    }
  );

  // Handle 'disconnect' event
  socket.on("disconnect", (socketCliente) => {
    try {
      chatController.handleDisconnect(socket);
    } catch (error: unknown) {
      // Handle errors by emitting the error message to the client
      if (error instanceof ErrorHandler) {
        socket.emit("error", {
          message: error.message,
          statusCode: error.statusCode,
        });
        return;
      }
      // General error handling if something else goes wrong
      socket.emit("error", {
        message: ERROR.INTERNAL_SERVICE_ERROR,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  });
};
