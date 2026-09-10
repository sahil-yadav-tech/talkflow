import Chat from "../models/chat.model.js";

const createChat = async (participants) => {
  return await Chat.create({
    participants,
  });
};

const findChatBetweenUsers = async (userId, otherUserId) => {
  return await Chat.findOne({
    participants: {
      $all: [userId, otherUserId],
    },
  });
};

const findChatById = async (chatId) => {
  console.log(chatId, "chatId", typeof chatId);
  return await Chat.findById(chatId);
};

export {
  createChat,
  findChatBetweenUsers,
  findChatById,
};