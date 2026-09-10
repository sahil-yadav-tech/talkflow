import Redis from "ioredis";

// if (!process.env.REDIS_URL) {
//   throw new Error(
//     "❌ REDIS_URL is missing in environment variables. Please configure Redis in your backend config."
//   );
// }

// const redis = new Redis("redis://localhost:6379", {
//   maxRetriesPerRequest: 3,
//   enableReadyCheck: true,
//   retryStrategy(times) {
//     if (times > 5) {
//       console.error("❌ Redis retry limit reached");
//       return null; // stop retrying
//     }

//     return Math.min(times * 200, 2000);
//   },
// });

const redis = new Redis(
  "rediss://default:gQAAAAAAAkIsAAIgcDExMmYwYTEyZjdlMjI0ZGZmODZkZGE1MzQwYWJmZTAyNg@exact-tuna-148012.upstash.io:6379",
);
redis.on("connect", () => {
  console.log("✅ Redis connected");
});

redis.on("error", (err) => {
  console.error("❌ Redis connection error:", err.message);
});

export default redis;
