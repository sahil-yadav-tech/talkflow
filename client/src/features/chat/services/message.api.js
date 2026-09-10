import api from "../../../lib/axios";

const getMessages = async (chatId) => {
  const response = await api.get(
    `/messages/${chatId}`
  );

  console.log(
    "Messages response:",
    response.data
  );

  return response.data.data.messages;
};

export {
  getMessages,
};