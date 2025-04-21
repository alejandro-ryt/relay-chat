import UserService from "@/services/userService";
import { IChat, IChatService, IChatDocument } from "@/interfaces/chat";
import { IMessage, IMessageDocument } from "@/interfaces/message";
import { Types } from "mongoose";
import { ERROR } from "@/constants/relayChat";
import { StatusCodes } from "http-status-codes";
import ChatRepository from "@/repositories/chats";
import { ErrorHandler } from "@/utils/errorHandler";
import UserRepository from "@/repositories/user";
import { Socket, Server } from "socket.io";
import { TFilter } from "@/types/chat";

const chatRepository = new ChatRepository();
const userRepository = new UserRepository();
const userService = new UserService();

class ChatService implements IChatService {
  // Get pending chat invites by user id
  public async getPendingChatInvitesByUserId(
    userId: string,
    socket: Socket
  ): Promise<void> {
    const invitations =
      await chatRepository.getPendingChatInvitesByUserId(userId);

    if (!invitations.length) {
      return;
    }

    invitations.forEach(async (invite) => {
      const chat = await chatRepository.findByChatId(invite.chatId);
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
    await chatRepository.clearPendingChatInvites(userId);
  }

  async joinAChat(
    socket: Socket,
    io: Server,
    currentUserId: string,
    chatName: string,
    type: "direct" | "group",
    membersId: string[]
  ): Promise<void> {
    // Find the user in the database using the userId
    const user = await userRepository.getUserById(currentUserId);
    // If the user doesn't exist, throw a custom error
    if (!user) {
      throw new ErrorHandler(
        ERROR.USER_NOT_EXIST_SOCKET,
        StatusCodes.NOT_FOUND
      );
    }

    // Find or create the chat (room) in the database
    await this.saveChat(chatName, type, [currentUserId, ...membersId]);

    // Get chat by name (Populated)
    const chat = await chatRepository.findByChatNamePopulated(chatName);
    // If the chat doesn't exist, throw a custom error
    if (!chat) {
      throw new ErrorHandler(ERROR.ERROR_CHAT_NOT_FOUND, StatusCodes.NOT_FOUND);
    }

    const messages = chat._id
      ? await this.messagesByChatId(chat._id.toString())
      : [];

    // Add each user to the socket room
    membersId.forEach(async (userId) => {
      if (chat.members.includes(new Types.ObjectId(userId))) return;
      // Here we emit the event to the individual user socket
      const userSocketId = await userRepository.getUserSocketIdByUserId(userId);
      if (!userSocketId) {
        if (!chat._id || (chat._id && !Types.ObjectId.isValid(chat._id))) {
          throw new Error(`Invalid chatId: ${chat._id}`);
        }

        if (!Types.ObjectId.isValid(userId)) {
          throw new Error(`Invalid userId: ${userId}`);
        }
        await chatRepository.saveChatInvitation(userId, chat._id.toString());
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
    io.to(chatName).emit("chatData", {
      _id: chat._id,
      name: chat.name,
      type: chat.type,
      members: chat.members,
      createdAt: chat.createdAt,
      updatedAt: chat.updatedAt,
      messages,
    });
    console.log(`${user.username} joined room ${chatName}`);
  }

  // Get all chats with last message by user id
  public async findChatsByUserId(userId: string) {
    // Return the populated type directly
    if (!userId) {
      throw new ErrorHandler(ERROR.ERROR_ID_REQUIRED, StatusCodes.BAD_REQUEST);
    }
    return await chatRepository.findChatsByUserId(userId);
  }

  // Find chat by name
  public async findByChatName(chatName: string): Promise<IChatDocument | null> {
    return await chatRepository.findByChatName(chatName);
  }

  // Find chat by name
  public async findByChatId(id: Types.ObjectId): Promise<IChatDocument | null> {
    return await chatRepository.findByChatId(id);
  }

  public async findByChatNamePopulated(
    chatName: string
  ): Promise<IChat | null> {
    return await chatRepository.findByChatNamePopulated(chatName);
  }

  // Find and/or save chat
  public async saveChat(
    chatName: string,
    type: "direct" | "group",
    userIds: string[] // Array of userIds
  ): Promise<IChatDocument> {
    // Find chat by name
    let chat = await chatRepository.findByChatName(chatName);
    if (chat) {
      // Ensure all users are added to the chat, avoiding duplicates
      const newUserIds = userIds.map((id) => new Types.ObjectId(id));
      const updatedMembers = new Set([
        ...chat.members.map((m) => m.toString()),
        ...newUserIds.map((_id) => _id.toString()),
      ]);

      chat.members = Array.from(updatedMembers).map(
        (id) => new Types.ObjectId(id)
      );

      await chatRepository.updateChat(chat);
    } else {
      // Create the chat if it doesn't exist
      const userIdsObj = userIds.map((id) => new Types.ObjectId(id));

      chat = await chatRepository.saveChat({
        name: chatName,
        type,
        members: userIdsObj,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return chat;
  }

  async saveChatInvitation(userId: string, chatId: string): Promise<void> {
    await chatRepository.saveChatInvitation(userId, chatId);
  }

  async clearPendingChatInvites(userId: string): Promise<void> {
    await chatRepository.clearPendingChatInvites(userId);
  }

  async messagesByChatId(chatId: string): Promise<IMessageDocument[]> {
    return await chatRepository.messagesByChatId(new Types.ObjectId(chatId));
  }

  async deleteMessageById(id: string): Promise<void> {
    if (!id) {
      throw new ErrorHandler(ERROR.ERROR_ID_REQUIRED, StatusCodes.BAD_REQUEST);
    }
    await chatRepository.deleteMessage(new Types.ObjectId(id));
  }

  async onSendMessageEvent(
    io: Server,
    socket: Socket,
    message: string,
    chatId: string,
    userId: string,
    membersIds: string[],
    messageId?: string
  ): Promise<void> {
    // Find the chat (room)
    const chat = await this.findByChatId(new Types.ObjectId(chatId));
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
    const newMessage = await this.saveMessage(
      message,
      userId,
      chatId,
      messageId
    );
    if (!newMessage) {
      throw new ErrorHandler("Message not created", StatusCodes.BAD_REQUEST);
    }

    // Emit message to the room
    io.to(chat.name).emit("sendMessage", {
      author: newMessage.author._id,
      _id: newMessage.id,
      message: newMessage.message,
      createdAt: newMessage.createdAt,
    });

    // Emit notification of a new message
    for (const memberUserId of membersIds) {
      try {
        const userSocketId =
          await userService.getUserSocketIdByUserId(memberUserId);
        if (!userSocketId) {
          console.warn(`Socket ID not found for user ${memberUserId}`);
          continue;
        }

        const memberSocketInstance = io.of("/").sockets.get(userSocketId);
        if (!memberSocketInstance) {
          console.warn(`Socket instance not found for user ${memberUserId}`);
          continue;
        }

        memberSocketInstance.emit("notification", {
          author: newMessage.author,
          message: newMessage.message,
        });
      } catch (innerError) {
        console.error(
          `Error sending notification to user ${memberUserId}:`,
          innerError
        );
      }
    }
  }

  // Save message in DB
  public async saveMessage(
    message: string,
    userId: string,
    chatId: string,
    messageId?: string
  ): Promise<IMessageDocument | null> {
    if (messageId) {
      const filter = messageId ? { _id: new Types.ObjectId(messageId) } : {};
      const update = {
        author: userId,
        chatId: new Types.ObjectId(chatId),
        message,
        updatedAt: new Date(),
      };
      const options = {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      };

      return await chatRepository.updateMessage(
        filter as TFilter,
        update as unknown as Partial<IMessage>,
        options
      );
    }

    const savedMessage = await chatRepository.saveMessage(
      message,
      userId,
      chatId
    );

    return await chatRepository.findMessageById(
      savedMessage._id as Types.ObjectId
    );
  }

  // Service to handle user disconnecting
  public async handleDisconnect(socketId: string): Promise<void> {
    const user = await userService.getUserBySocketId(socketId);
    // If the user doesn't exist, throw a custom error
    if (!user) {
      throw new ErrorHandler(
        ERROR.USER_NOT_EXIST_SOCKET,
        StatusCodes.NOT_FOUND
      );
    }
    await userService.updateUser(user.id, user);
  }
}

export default ChatService;
