import { findMessagesByChatId } from "../repositories/message.repository.js";

import {
  findChatById,
} from "../repositories/chat.repository.js";

import AppError from "../utils/appError.js";

const getChatMessages = async ({
  chatId,
  userId,
}) => {
  const chat = await findChatById(chatId);

  if (!chat) {
    throw new AppError(
      "Chat not found",
      404
    );
  }

  const isParticipant =
    chat.participants.some(
      (participantId) =>
        participantId.toString() === userId
    );

  if (!isParticipant) {
    throw new AppError(
      "You are not a member of this chat",
      403
    );
  }

  const messages =
    await findMessagesByChatId(chatId);

  return messages;
};

export default getChatMessages;