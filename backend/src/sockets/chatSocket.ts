import { Server, Socket } from "socket.io";
import * as chatController from "@/controllers/chatController";
import { ErrorHandler } from "@/utils/errorHandler";
import { ERROR } from "@/constants/relayChat";
import { StatusCodes } from "http-status-codes";

export const handleSocketEvents = (io: Server, socket: Socket) => {
  // Handle 'joinChat' event
  socket.on('joinChat', async (chatName: string, type: "direct" | "group",  userId: string) => {
    try {        
      await chatController.joinChat(socket, chatName, type, userId); // Call your controller's joinChat logic
    } catch (error: unknown) {
        // Handle errors by emitting the error message to the client
        if (error instanceof ErrorHandler) {
            socket.emit('error', { message: error.message, statusCode: error.statusCode });
            return;
        }
        // General error handling if something else goes wrong
        socket.emit('error', { message: ERROR.INTERNAL_SERVICE_ERROR, statusCode: StatusCodes.INTERNAL_SERVER_ERROR });
    }
  });

  // Handle 'sendMessage' event
  socket.on('sendMessage', async (message: string, chatName: string, userId: string) => {
    try {
      await chatController.sendMessage(io, socket, message, chatName, userId);
    } catch (error: unknown) {
        // Handle errors by emitting the error message to the client
        if (error instanceof ErrorHandler) {
            socket.emit('error', { message: error.message, statusCode: error.statusCode });
            return;
        }
        // General error handling if something else goes wrong
        socket.emit('error', { message: ERROR.INTERNAL_SERVICE_ERROR, statusCode: StatusCodes.INTERNAL_SERVER_ERROR });
    }
  });

  // Handle 'disconnect' event
  socket.on('disconnect', () => {
    try {
        console.log(`User disconnected: ${socket.id}`);
        chatController.handleDisconnect(socket);
    } catch (error: unknown) {
        // Handle errors by emitting the error message to the client
        if (error instanceof ErrorHandler) {
            socket.emit('error', { message: error.message, statusCode: error.statusCode });
            return;
        }
        // General error handling if something else goes wrong
        socket.emit('error', { message: ERROR.INTERNAL_SERVICE_ERROR, statusCode: StatusCodes.INTERNAL_SERVER_ERROR });
    }
  });
};
