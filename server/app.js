import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";

import errorMiddleware from "./middleware/errorMiddleware.js";
import redis from "./config/redis.config.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(cookieParser());

// const handleRateLimiting = async (req, res, next) => {
//   try {
//     console.log(req.ip, "IP address");

//     const redisKey = `rate-limit:${req.ip}`;

//     const current = await redis.incr(redisKey);

//     console.log(current, "current");

//     if (current === 1) {
//       await redis.expire(redisKey, 60);
//     }

//     if (current > 5) {
//       return res.status(429).json({
//         success: false,
//         message: "Too many requests. Please try again later.",
//       });
//     }

//     next();
//   } catch (error) {
//     next(error);
//   }
// }
const rateLimitStore = new Map();

const rateLimiter = (req, res, next) => {
  const ip = req.ip;

  const currentTime = Date.now();
  const windowTime = 60 * 1000; // 1 minute
  const limit = 5;

  const userData = rateLimitStore.get(ip);
  

  // First request
  if (!userData) {
    rateLimitStore.set(ip, {
      count: 1,
      startTime: currentTime,
    });

    return next();
  }

  console.log(userData);
  console.log(rateLimitStore, "rateLimitStore");
  


  // Reset after 1 minute
  if (currentTime - userData.startTime >= windowTime) {
    rateLimitStore.set(ip, {
      count: 1,
      startTime: currentTime,
    });

    return next();
  }

  // Limit exceeded
  if (userData.count >= limit) {
    return res.status(429).json({
      success: false,
      message: "Too many requests. Please try again later.",
    });
  }

  // Increase request count
  userData.count++;

  next();
};
// rateLimiter
app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "API is running",
  });
});

import chatRoutes from "./routes/chat.routes.js"
import messageRoutes from "./routes/message.routes.js";
app.use("/api/auth", authRoutes);

app.use(
  "/api/chats",
  chatRoutes
);

app.use(
  "/api/messages",
  messageRoutes
);


app.use(errorMiddleware);

export default app;
