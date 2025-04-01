import { Socket } from "socket.io";
// import User from "@/models/userModel";
import UserService from "@/services/userService";
import Chat from "@/models/chatModel";
import Message from "@/models/messageModel";
import { IUser, IUserDocument } from "@/interfaces/user";
import { IChat, IChatService, IChatDocument } from "@/interfaces/chat";
import { IMessageDocument } from "@/interfaces/message";

const userService = new UserService();

class ChatService implements IChatService {
    // Find chat by name
    public async findByChatName(chatName: string): Promise<IChatDocument | null> {
        return await Chat.findOne({name: chatName}).exec();
    }
    // Find and/or save chat
    public async saveChat(chatName: string, user: IUserDocument): Promise<IChatDocument> {
        // Find chat or create a new one
        const chat = await Chat.findOneAndUpdate(
            { name: chatName },
            { name: chatName, users: [user._id] },
            { upsert: true, new: true }
        ).exec();

        return chat;
    }

  // Save message in DB
  public async saveMessage(chatId: string, message: string, userId: string): Promise<IMessageDocument> {
    const newMessage = new Message({
        chat: chatId,
        username: userId,
        message,
        createdAt: new Date(),
    });

    return await newMessage.save();
  }

  // Service to handle user disconnecting
  public async handleDisconnect(socket: Socket): Promise<void> {
    // try {
    //   const user = await User.findOneAndDelete({ socketId: socket.id });
    //   if (user) {
    //     console.log(`${user.username} disconnected`);
    //   }
    // } catch (error) {
    //   console.error("Error handling disconnect:", error);
    // }
  }
}

export default ChatService;
