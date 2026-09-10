import {
  createChat,
  findChatBetweenUsers,
} from "../repositories/chat.repository.js";

import { findUserById } from "../repositories/user.repository.js";

import AppError from "../utils/appError.js";

const createOneToOneChat = async ({ userId, otherUserId }) => {
  // Cannot create chat with yourself
  if (userId === otherUserId) {
    throw new AppError("You cannot create chat with yourself", 400);
  }

  // Check other user exists
  const otherUser = await findUserById(otherUserId);

  if (!otherUser) {
    throw new AppError("User not found", 404);
  }

  // Check existing chat
  const existingChat = await findChatBetweenUsers(userId, otherUserId);

  if (existingChat) {
    return existingChat;
  }

  // Create new chat
  const chat = await createChat([userId, otherUserId]);

  return chat;
};

export default createOneToOneChat;
