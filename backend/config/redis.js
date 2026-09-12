const Redis = require("ioredis");

const redis = new Redis({
  host: "localhost",
  port: 6379,
  maxRetriesPerRequest:null
});

redis.on("connect", () => {
  console.log("Redis connected");
});

redis.on("error", (error) => {
  console.error("Redis error:", error);
});
module.exports = redis;