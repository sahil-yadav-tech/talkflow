import Message from "../models/message.model.js";

const createMessage = async ({
  chatId,
  senderId,
  text,
}) => {
  return await Message.create({
    chatId,
    senderId,
    text,
  });
};

const findMessagesByChatId = async (chatId) => {
  return await Message.find({
    chatId,
  })
    .sort({ createdAt: 1 })
    .populate("senderId", "name email");
};

export {
  createMessage,
  findMessagesByChatId,
};