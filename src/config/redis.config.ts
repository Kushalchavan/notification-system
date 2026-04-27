import { RedisOptions } from "ioredis";
import { serverConfig } from "./env.config";

export const redisConfig: RedisOptions = {
  host: serverConfig.REDIS_HOST,
  port: serverConfig.REDIS_PORT,
};
