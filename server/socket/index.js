import { Server } from "socket.io";

import { socketConfig } from "../config/socket.config.js";
import { handleConnection } from "./handler/connection.handler.js";
import socketAuth from "./middleware/socketAuth.middleware.js";
// import { registerSocketMiddleware } from "./middleware/socketAuth.middleware.js";

export const initializeSocket = (httpServer) => {
  const io = new Server(httpServer, socketConfig);

  // Socket middleware
  //   registerSocketMiddleware(io);
  
  io.use(socketAuth);
  
  
  // Socket connection
  io.on("connection", (socket) => {
    handleConnection(io, socket);
  });
  
  return io;
};

// 1. Create Socket.IO
// 2. Register middleware
// 3. Register connection handler
