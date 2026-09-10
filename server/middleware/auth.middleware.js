import jwt from "jsonwebtoken";
import { parse } from "cookie";

import env from "../config/env.js";

const authMiddleware = (
  req,
  res,
  next
) => {
  try {
    const cookieHeader =
      req.headers.cookie;

    if (!cookieHeader) {
      return res.status(401).json({
        success: false,
        message:
          "Authentication cookie is required",
      });
    }

    const cookies =
      parse(cookieHeader);

    const token =
      cookies.accessToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message:
          "Access token is required",
      });
    }

    const decoded = jwt.verify(
      token,
      env.jwtSecret
    );

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message:
        "Invalid or expired token",
    });
  }
};

export default authMiddleware;