import { NextFunction, Request, Response } from "express";
import { Server, Socket } from "socket.io";
import { StatusCodes } from "http-status-codes";
import ChatService from "@/services/chatService";
import { normalizeSocketError } from "@/utils/normalizeSocketError";
import ChatRepository from "@/repositories/chats";

const chatService = new ChatService();
const chatRepository = new ChatRepository();

/**
 * HTTP methods
 */
/**
 *
 * @param req Request
 * @param res Response
 */
export const getChatsByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const chats = await chatRepository.findChatsByUserId(id);
    res.status(StatusCodes.OK).json(chats);
  } catch (error) {
    console.log("Error getting chat by userID", error);
    next(error);
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
    await chatService.getPendingChatInvitesByUserId(userId, socket);
  } catch (error) {
    const normalizedError = normalizeSocketError(error);

    console.error("Error checking for pending invites:", normalizedError);

    socket.emit("error", {
      message: normalizedError.message,
      statusCode: normalizedError.statusCode,
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
    await chatService.joinAChat(
      socket,
      io,
      currentUserId,
      chatName,
      type,
      membersId
    );
  } catch (error) {
    const normalizedError = normalizeSocketError(error);

    console.error("Error joining room:", normalizedError);

    socket.emit("error", {
      message: normalizedError.message,
      statusCode: normalizedError.statusCode,
    });
  }
};

export const getMessagesByChatId = async (chatId: string, socket: Socket) => {
  try {
    return await chatService.messagesByChatId(chatId);
  } catch (error) {
    const normalizedError = normalizeSocketError(error);
    socket.emit("error", {
      message: normalizedError.message,
      statusCode: normalizedError.statusCode,
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
  chatId: string,
  userId: string,
  membersIds: string[],
  messageId?: string
): Promise<void> => {
  try {
    console.log("chatId", chatId);
    await chatService.onSendMessageEvent(
      io,
      message,
      chatId,
      userId,
      membersIds,
      messageId
    );
  } catch (error) {
    const normalizedError = normalizeSocketError(error);

    console.error("Error sending message:", normalizedError);

    socket.emit("error", {
      message: normalizedError.message,
      statusCode: normalizedError.statusCode,
    });
  }
};

export const deleteMessageById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await chatService.deleteMessageById(id);
    res
      .status(StatusCodes.OK)
      .json({ message: "Message deleted successfully" });
  } catch (error) {
    next(error);
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
    await chatService.handleDisconnect(socket.id);
  } catch (error) {
    const normalizedError = normalizeSocketError(error);

    console.error("Socket disconnect error:", normalizedError);

    socket.emit("error", {
      message: normalizedError.message,
      statusCode: normalizedError.statusCode,
    });
  }
};
