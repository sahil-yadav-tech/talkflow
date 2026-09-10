import redis from "../config/redis.config.js";

export const rateLimiting = async (req, res, next) => {
  try {
    const rateLimitKey = `redis:ip:${req.ip}`;

    const count = await redis.incr(rateLimitKey);

    // First request par 60 sec expiry set karo
    if (count === 1) {
      await redis.expire(rateLimitKey, 60);
    }

    if (count > 100) {
      return res.status(429).json({
        status: false,
        message: "Too many requests",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    next();
  }
};




// import Redis from "ioredis";

// const redis = new Redis.Cluster([
//   {
//     host: "10.0.0.10",
//     port: 6379,
//   },
//   {
//     host: "10.0.0.11",
//     port: 6379,
//   },
//   {
//     host: "10.0.0.12",
//     port: 6379,
//   },
// ]);

// redis.on("connect", () => {
//   console.log("Redis Cluster Connected");
// });

// redis.on("error", (err) => {
//   console.log(err);
// });