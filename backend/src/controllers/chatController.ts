import { NextFunction, Request, Response } from "express";
import { Server, Socket } from "socket.io";
import { StatusCodes } from "http-status-codes";
import ChatService from "@/services/chatService";
import UserService from "@/services/userService";
import { ERROR } from "@/constants/relayChat";
import { ErrorHandler } from "@/utils/errorHandler";
import { IMessage } from "@/interfaces/message";
import { Types } from "mongoose";

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
  res: Response,
  next: NextFunction
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
              message: lastMessage.message,
              author: lastMessage.author,
              timestamp: lastMessage.createdAt,
            }
          : null,
        timestamp: chat.createdAt.toLocaleDateString(),
      };
    });

    res.status(StatusCodes.OK).json(formattedChats);
  } catch (error) {
    console.log("Error getting chat by userID", error);
    if (error instanceof ErrorHandler) {
      return next(error);
    }
    return next(
      new ErrorHandler(
        ERROR.INTERNAL_SERVICE_ERROR,
        StatusCodes.SERVICE_UNAVAILABLE
      )
    );
  }
};

/**
 * Chat events methods
 *
 */

/**
 * Look up for pending chat invites
 *
 */
export const lookUpForPendingInvites = async (
  socket: Socket,
  userId: string
) => {
  try {
    const invitations = await chatService.getPendingChatInvitesByUserId(userId);

    if (!invitations.length) {
      return;
    }

    invitations.forEach(async (invite) => {
      const chat = await chatService.findByChatId(invite.chatId);
      if (!chat) {
        throw new ErrorHandler(
          ERROR.ERROR_CHAT_NOT_FOUND,
          StatusCodes.NOT_FOUND
        );
      }
      socket.join(chat.name); // Join the room for the user
      socket.emit(
        "notification",
        `You were invited to join the chat: ${chat.name}`
      );
      console.log(`${userId} joined the room ${chat.name}`);
    });

    // After the user has joined the rooms, clear the invitations
    await chatService.clearPendingChatInvites(userId);
  } catch (error) {
    // Handle errors by looking up chat pending invites
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
 * @param chatName string
 * @param userId string
 * @returns void
 * @description Join to an existing chat (room) or create a new one and assign the user to it
 */
export const joinChat = async (
  io: Server,
  socket: Socket,
  chatName: string,
  type: "direct" | "group",
  currentUserId: string,
  membersId: string[]
): Promise<void> => {
  try {
    // Find the user in the database using the userId
    const user = await userService.getUserById(currentUserId);
    // If the user doesn't exist, throw a custom error
    if (!user) {
      throw new ErrorHandler(
        ERROR.USER_NOT_EXIST_SOCKET,
        StatusCodes.NOT_FOUND
      );
    }

    // Find or create the chat (room) in the database
    await chatService.saveChat(chatName, type, [currentUserId, ...membersId]);

    // Get chat by name (Populated)
    const chat = await chatService.findByChatNamePopulated(chatName);
    // If the chat doesn't exist, throw a custom error
    if (!chat) {
      throw new ErrorHandler(ERROR.ERROR_CHAT_NOT_FOUND, StatusCodes.NOT_FOUND);
    }

    // Add each user to the socket room
    membersId.forEach(async (userId) => {
      if (chat.members.includes(new Types.ObjectId(userId))) return;
      // Here we emit the event to the individual user socket
      const userSocketId = await userService.getUserSocketIdByUserId(userId);
      if (!userSocketId) {
        await chatService.saveChatInvitation(userId, chatName);
        return;
      }
      const memberSocketInstance = io.of("/").sockets.get(userSocketId);

      if (!memberSocketInstance) {
        throw new ErrorHandler(
          ERROR.ERROR_SOCKET_INSTANCE_NOT_FOUND,
          StatusCodes.NOT_FOUND
        );
      }
      memberSocketInstance.join(chatName); // Add other users/members to the chat
    });

    socket.join(chat.name ?? chatName); // Join the room
    socket.emit("notification", `Welcome to room ${chatName}!`);
    io.to(chatName).emit("chatData", chat);
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
      author: newMessage.author,
      _id: newMessage.id,
      message: newMessage.message,
      createdAt: newMessage.createdAt,
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
    await chatService.handleDisconnect(user.id, { socketId: null });
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
