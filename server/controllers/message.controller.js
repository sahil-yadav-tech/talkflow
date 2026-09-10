import getChatMessages from "../services/message.service.js";

const getMessages = async (
  req,
  res,
  next
) => {
  try {
    const userId = req.user.userId;

    const { chatId } = req.params;

    const messages = await getChatMessages({
      chatId,
      userId,
    });

    return res.status(200).json({
      success: true,
      data: {
        messages,
      },
    });
  } catch (error) {
    next(error);
  }
};

export {
  getMessages,
};