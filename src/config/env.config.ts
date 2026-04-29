import dotenv from "dotenv";

type ServerConfig = {
  PORT: number;
  DATABASE_URL: string;
  REDIS_HOST: string;
  REDIS_PORT: number;
  EMAIL_USER: string;
  EMAIL_PASS: string;
};

function loadConfig() {
  dotenv.config();
  console.log("Environment variables loaded successfully");
}
loadConfig();

export const serverConfig: ServerConfig = {
  PORT: Number(process.env.PORT) || 3001,
  DATABASE_URL: process.env.DATABASE_URL!,
  REDIS_HOST: process.env.REDIS_HOST || "127.0.0.1",
  REDIS_PORT: Number(process.env.REDIS_PORT) || 6379,
  EMAIL_USER: process.env.EMAIL_USER!,
  EMAIL_PASS: process.env.EMAIL_PASS!,
};
