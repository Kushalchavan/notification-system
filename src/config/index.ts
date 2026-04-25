import dotenv from "dotenv";

type ServerConfig = {
  PORT: number;
  DATABASE_URL: string;
};

function loadConfig() {
  dotenv.config();
  console.log("Environment variables loaded successfully");
}
loadConfig();

export const serverConfig: ServerConfig = {
  PORT: Number(process.env.PORT) || 3001,
  DATABASE_URL: process.env.DATABASE_URL!,
};
