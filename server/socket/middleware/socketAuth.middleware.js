import jwt from "jsonwebtoken";
import { parse } from "cookie";
import env from "../../config/env.js";

const socketAuth = (socket, next) => {
  try {
    const cookieHeader = socket.handshake.headers.cookie;

    console.log("Cookie Header:", cookieHeader);

    if (!cookieHeader) {
      return next(
        new Error("Authentication cookie is required")
      );
    }

    const cookies = parse(cookieHeader);

    const token = cookies.accessToken;

    console.log("Socket Token:", token);

    if (!token) {
      return next(
        new Error("Access token is required")
      );
    }

    const decoded = jwt.verify(
      token,
      env.jwtSecret
    );

    socket.user = decoded;

    console.log(
      "Authenticated Socket User:",
      socket.user
    );

    next();
  } catch (error) {
    console.error(
      "Socket authentication error:",
      error.message
    );

    next(
      new Error("Invalid or expired token")
    );
  }
};

export default socketAuth;