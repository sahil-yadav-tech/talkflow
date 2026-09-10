const registerPresenceEvents = (io, socket) => {

  socket.on("get-online-status", (userId, callback) => {

    const sockets = io.sockets.adapter.rooms.get(
      `user:${userId}`
    );

    const isOnline = !!sockets?.size;

    callback({
      userId,
      isOnline,
    });

  });

};

export default registerPresenceEvents;