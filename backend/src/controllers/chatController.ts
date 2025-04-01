import { Socket } from "socket.io";
import { StatusCodes } from "http-status-codes";
import ChatService from "@/services/chatService";
import UserService from "@/services/userService";
import { ERROR } from "@/constants/relayChat";
import { IUser } from "@/interfaces/user";
import { ErrorHandler } from "@/utils/errorHandler";

const chatService = new ChatService();
const userService = new UserService();

// GET user by id
export const joinChat = async (socket: Socket, chatName: string): Promise<void> => {
    try {
        // Find the user in the database using the socketId
        const user = await userService.getUserBySocketId(socket.id)
    
        // If the user doesn't exist, throw a custom error
        if (!user) {
          throw new ErrorHandler(ERROR.USER_NOT_EXIST_SOCKET, StatusCodes.NOT_FOUND);
        }
    
        // Find or create the chat (room) in the database
        const chat = await chatService.saveChat(chatName, user);
    
        socket.join(chat.name ?? chatName); // Join the room
    
        socket.emit('message', `Welcome to room ${chatName}!`);
        console.log(`${user.username} joined room ${chatName}`);
    } catch (error) {
        // Handle errors by emitting the error message to the client
        if (error instanceof ErrorHandler) {
            socket.emit('error', { message: error.message, statusCode: error.statusCode });
        } else {
            // General error handling if something else goes wrong
            socket.emit('error', { message: ERROR.INTERNAL_SERVICE_ERROR, statusCode: StatusCodes.INTERNAL_SERVER_ERROR });
        }
        console.error("Error joining room:", error);
    }
};

export const sendMessage = async (socket: Socket, message: string, chatName: string): Promise<void> => {
    try {
        // Find the chat (room)
        const chat = await chatService.findByChatName(chatName);
  
        if (!chat) {
            throw new ErrorHandler(ERROR.ERROR_CHAT_NOT_FOUND, StatusCodes.NOT_FOUND);
        }
        // Find the user in the database using the socketId
        const user = await userService.getUserBySocketId(socket.id)
    
        // If the user doesn't exist, throw a custom error
        if (!user) {
          throw new ErrorHandler(ERROR.USER_NOT_EXIST_SOCKET, StatusCodes.NOT_FOUND);
        }

        // Save message to DB
        const newMessage = await chatService.saveMessage(chat.id, message, user.id);
        // Emit message to the room
        socket.to(chatName).emit('message', { username: user.username, message: newMessage });
    } catch (error) {
        // Handle errors by emitting the error message to the client
        if (error instanceof ErrorHandler) {
            socket.emit('error', { message: error.message, statusCode: error.statusCode });
        } else {
            // General error handling if something else goes wrong
            socket.emit('error', { message: ERROR.INTERNAL_SERVICE_ERROR, statusCode: StatusCodes.INTERNAL_SERVER_ERROR });
        }
        console.error("Error joining room:", error);
    }
};

