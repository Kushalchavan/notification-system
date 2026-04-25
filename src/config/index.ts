import dotenv from "dotenv";

type ServerConfig = {
  PORT: number;
};

function loadConfig() {
  dotenv.config();
  console.log("Environment variables loaded successfully");
}
loadConfig();

export const serverConfig: ServerConfig = {
  PORT: Number(process.env.PORT) || 3001,
};
