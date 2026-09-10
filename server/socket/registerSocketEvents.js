import registerChatEvents from "./events/chat.events.js";
import registerPresenceEvents from "./events/presence.events.js";

const registerSocketEvents = (io, socket) => {
  console.log(
    `User connected: ${socket.user.id}`
  );

  // Join personal room
  socket.join(`user:${socket.user.id}`);

  // Register modules
  registerChatEvents(io, socket);
  registerPresenceEvents(io, socket);

  socket.on("disconnect", (reason) => {
    console.log(
      `User disconnected: ${socket.user.id}`,
      reason
    );
  });
};

export default registerSocketEvents;