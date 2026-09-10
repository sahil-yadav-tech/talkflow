const registerChatEvents = (io, socket) => {

  // Join chat room
  socket.on("join-room", (roomId) => {
    socket.join(`chat:${roomId}`);

    console.log(
      `${socket.user.id} joined chat:${roomId}`
    );
  });


  // Send message
  socket.on("send-message", async (data, callback) => {
    try {

      const { roomId, message } = data;

      if (!roomId || !message) {
        return callback({
          success: false,
          message: "Invalid data",
        });
      }

      const messageData = {
        roomId,
        message,
        senderId: socket.user.id,
        createdAt: new Date(),
      };

      // Save in database here
      // await Message.create(messageData);

      // Emit to room
      io.to(`chat:${roomId}`).emit(
        "new-message",
        messageData
      );

      callback({
        success: true,
        message: "Message sent successfully",
      });

    } catch (error) {

      console.error("Send message error:", error);

      callback({
        success: false,
        message: "Something went wrong",
      });
    }
  });

};

export default registerChatEvents;