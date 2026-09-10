export const handleDisconnect = (socket, reason) => {
  console.log("User disconnected:", socket.id);
  console.log("Reason:", reason);
};