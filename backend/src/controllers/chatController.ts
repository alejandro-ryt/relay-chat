import { Request, Response } from "express";
import { Server, Socket } from "socket.io";
import { StatusCodes } from "http-status-codes";
import ChatService from "@/services/chatService";
import UserService from "@/services/userService";
import { ERROR } from "@/constants/relayChat";
import { ErrorHandler } from "@/utils/errorHandler";
import { IMessage } from "@/interfaces/message";

const chatService = new ChatService();
const userService = new UserService();

/**
 * HTTP methods
 */
/**
 *
 * @param req Request
 * @param res Response
 * @description Get all chats by user id with a specific format:
 * {
 *  id
 *  chatName,
 *  chatPic,
 *  lastMessage {}
 *  timestamp
 * }
 */
export const getChatsByUserId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.params.id) {
      throw new ErrorHandler(ERROR.ERROR_ID_REQUIRED, StatusCodes.BAD_REQUEST);
    }
    const chats = await chatService.findChatsByUserId(req.params.id);

    const formattedChats = chats.map((chat) => {
      // Cast to IMessage[]
      const messages = chat.messages as unknown as IMessage[];
      // Get last message
      const lastMessage = messages[0];
      return {
        id: chat._id,
        chatName: chat.name,
        chatPic: chat.chatPic,
        lastMessage: lastMessage
          ? {
              content: lastMessage.message,
              sender: lastMessage.username,
              // Get the timestamp when the message was sent
              timestamp: new Date(lastMessage.createdAt).toLocaleTimeString(
                "en-US",
                {
                  hour12: false,
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                }
              ),
            }
          : null,
        timestamp: chat.createdAt.toLocaleDateString(),
      };
    });

    res.status(StatusCodes.OK).json(formattedChats);
  } catch (error) {
    console.log("Error getting chat by userID", error);
    if (error instanceof ErrorHandler) {
      throw new ErrorHandler(error.message, error.statusCode);
    }
    throw new ErrorHandler(
      ERROR.ERROR_CREATING_USER,
      StatusCodes.SERVICE_UNAVAILABLE
    );
  }
};

/**
 * Chat events methods
 */

/**
 *
 * @param socket Socket
 * @param chatName string
 * @param userId string
 * @returns void
 * @description Join to an existing chat (room) or create a new one and assign the user to it
 */
export const joinChat = async (
  socket: Socket,
  chatName: string,
  type: "direct" | "group",
  userId: string
): Promise<void> => {
  try {
    // Find the user in the database using the userId
    const user = await userService.getUserById(userId);
    // If the user doesn't exist, throw a custom error
    if (!user) {
      throw new ErrorHandler(
        ERROR.USER_NOT_EXIST_SOCKET,
        StatusCodes.NOT_FOUND
      );
    }
    // Assign socket.id to user
    await userService.updateUser(userId, { socketId: socket.id });

    // Find or create the chat (room) in the database
    const chat = await chatService.saveChat(chatName, type, userId);
    socket.join(chat.name ?? chatName); // Join the room

    socket.emit("message", `Welcome to room ${chatName}!`);
    console.log(`${user.username} joined room ${chatName}`);
  } catch (error) {
    console.error("Error joining room:", error);
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
};

/**
 *
 * @param socket Socket
 * @param message string
 * @param chatName string
 * @returns void
 * @description Emit message to chat and save it to the db
 */
export const sendMessage = async (
  io: Server,
  socket: Socket,
  message: string,
  chatName: string,
  userId: string
): Promise<void> => {
  try {
    // Find the chat (room)
    const chat = await chatService.findByChatName(chatName);
    if (!chat) {
      throw new ErrorHandler(ERROR.ERROR_CHAT_NOT_FOUND, StatusCodes.NOT_FOUND);
    }
    // Find the user in the database using the userId
    const user = await userService.getUserById(userId);
    // If the user doesn't exist, throw a custom error
    if (!user) {
      throw new ErrorHandler(
        ERROR.USER_NOT_EXIST_SOCKET,
        StatusCodes.NOT_FOUND
      );
    }

    // Save message to DB
    const newMessage = await chatService.saveMessage(message, userId);
    // Inject message to chats
    await chatService.addMessageToChat(chat, newMessage.id);
    // Emit message to the room
    io.to(chatName).emit("sendMessage", {
      username: user.username,
      message: newMessage.message,
    });
  } catch (error) {
    console.error("Error joining room:", error);
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
};

/**
 *
 * @param socket Socket
 * @returns void
 * @description Handle user disconnections by removing the socket.id from the user
 */
export const handleDisconnect = async (socket: Socket): Promise<void> => {
  try {
    const user = await userService.getUserBySocketId(socket.id);
    // If the user doesn't exist, throw a custom error
    if (!user) {
      throw new ErrorHandler(
        ERROR.USER_NOT_EXIST_SOCKET,
        StatusCodes.NOT_FOUND
      );
    }
    await chatService.handleDisconnect(user.id, { socketId: undefined });
  } catch (error) {
    console.error("Error handling disconnect:", error);
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
};
