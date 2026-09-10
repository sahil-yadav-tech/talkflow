import api from "../../../lib/axios";

const createChat = async (otherUserId) => {
  const response = await api.post("/chats", {
    otherUserId,
  });

  console.log(
    "Create chat response:",
    response.data
  );

  return response.data.data.chat;
};

export {
  createChat,
};