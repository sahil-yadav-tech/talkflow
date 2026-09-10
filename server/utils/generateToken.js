import jwt from "jsonwebtoken";
import env from "../config/env.js";

const generateToken = (user) => {
  const payload = {
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  });

  return token;
};

export default generateToken;