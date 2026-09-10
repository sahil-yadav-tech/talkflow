import createOneToOneChat from "../services/chat.service.js";

const createChat = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const { otherUserId } = req.body;

    const chat = await createOneToOneChat({
      userId,
      otherUserId,
    });

    return res.status(201).json({
      success: true,
      message: "Chat created successfully",
      data: {
        chat,
      },
    });
  } catch (error) {
    next(error);
  }
};

export {
  createChat,
};