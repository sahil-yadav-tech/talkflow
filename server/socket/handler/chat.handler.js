import { findChatById } from "../../repositories/chat.repository.js";
import {
  createMessage,
} from "../../repositories/message.repository.js";
import { getChatRoom } from "../rooms/chat.room.js";

export const handleChatEvents = (io, socket) => {

  // =========================
  // JOIN CHAT
  // =========================

  socket.on(
    "join-chat",
    async (chatId, callback) => {
      try {
        const userId = socket.user.userId;

        const chat = await findChatById(chatId);

        if (!chat) {
          return callback?.({
            success: false,
            message: "Chat not found",
          });
        }

        const isParticipant =
          chat.participants.some(
            (participantId) =>
              participantId.toString() === userId
          );

        if (!isParticipant) {
          return callback?.({
            success: false,
            message:
              "You are not a member of this chat",
          });
        }

        const chatRoom = getChatRoom(chatId);

        await socket.join(chatRoom);

        console.log(
          `User ${userId} joined ${chatRoom}`
        );

        callback?.({
          success: true,
          message: "Joined chat successfully",
          chatId,
        });

      } catch (error) {
        console.error(
          "Join chat error:",
          error
        );

        callback?.({
          success: false,
          message: "Failed to join chat",
        });
      }
    }
  );


  // =========================
  // SEND MESSAGE
  // =========================

  socket.on(
    "send-message",
    async (data, callback) => {
      try {
        const userId = socket.user.userId;

        const {
          chatId,
          text,
        } = data;

        console.log(
          "Incoming message:",
          {
            userId,
            chatId,
            text,
          }
        );

        // 1. Check chat
        const chat = await findChatById(chatId);

        if (!chat) {
          return callback?.({
            success: false,
            message: "Chat not found",
          });
        }

        // 2. Check participant
        const isParticipant =
          chat.participants.some(
            (participantId) =>
              participantId.toString() === userId
          );

        if (!isParticipant) {
          return callback?.({
            success: false,
            message:
              "You are not a member of this chat",
          });
        }

        // 3. Validate message
        if (!text || !text.trim()) {
          return callback?.({
            success: false,
            message: "Message cannot be empty",
          });
        }

        // 4. Save message
        const message = await createMessage({
          chatId,
          senderId: userId,
          text: text.trim(),
        });

        console.log(
          "Message saved:",
          message
        );

        // 5. Get chat room
        const chatRoom = getChatRoom(chatId);

        // 6. Emit message to room
        io.to(chatRoom).emit(
          "new-message",
          message
        );

        // 7. Response to sender
        callback?.({
          success: true,
          message:
            "Message sent successfully",
          data: {
            message,
          },
        });

      } catch (error) {
        console.error(
          "Send message error:",
          error
        );

        callback?.({
          success: false,
          message: "Failed to send message",
        });
      }
    }
  );
};