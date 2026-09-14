// import { registerChatEvents } from "../events/chat.events.js";
// import { registerPresenceEvents } from "../events/presence.events.js";
// import { registerNotificationEvents } from "../events/notification.events.js";
// import { registerTypingEvents } from "../events/typing.events.js";

import { getUserRoom } from "../rooms/user.room.js";
import { handleChatEvents } from "./chat.handler.js";
import { handleDisconnect } from "./disconnect.handler.js";

// import { handleDisconnect } from "./disconnect.handler";

export const handleConnection = (io, socket) => {
  //   console.log(
  //     `User connected: ${socket.user.id}`
  //   );

  console.log("User connected:", socket.id);
  const userRoom = getUserRoom(socket.user.userId);
  console.log(userRoom, "userRoom getting user name");
  
  socket.join(userRoom);
  console.log(`Joined room: ${userRoom}`);


   // Chat events
  handleChatEvents(io, socket);

  socket.on("disconnect", (reason) => {
    handleDisconnect(socket, reason);
  });

  //   // Register socket events
  //   registerChatEvents(io, socket);

  //   registerPresenceEvents(io, socket);

  //   registerNotificationEvents(io, socket);

  //   registerTypingEvents(io, socket);

  //   socket.on("disconnect", (reason) => {

  //     console.log(
  //       `User disconnected: ${socket.user.id}`
  //     );

  //     console.log(
  //       `Reason: ${reason}`
  //     );

  //   });
};
