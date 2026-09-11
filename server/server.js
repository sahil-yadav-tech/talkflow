console.log(
  "JAI SHREE RAM JI / JAI BAJARANG BALI JI ❤️👏"
);

import dotenv from "dotenv";

dotenv.config();

import http from "http";

import app from "./app.js";

import connectDB from "./config/db.js";

import { initializeSocket } from "./socket/index.js";

const PORT = process.env.PORT || 9080;

const startServer = async () => {
  try {
    // Connect MongoDB first
    await connectDB();

    // Create HTTP server
    const httpServer = http.createServer(app);

    // Initialize Socket.IO
    initializeSocket(httpServer);

    // Start server
    httpServer.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(
      "Server startup failed:",
      error.message
    );

    process.exit(1);
  }
};

startServer();

