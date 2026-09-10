export const socketConfig = {
  cors: {
    origin:["http://localhost:5173"],
    credentials: true,
  },

  transports: ["websocket", "polling"],

  pingTimeout: 60000,

  pingInterval: 25000,
};