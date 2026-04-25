import express from "express";
import logger from "./config/logger.config";
import { serverConfig } from "./config/index";
import { appErrorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the notifications system!");
});

// error handlers
app.use(appErrorHandler);

app.listen(serverConfig.PORT, () => {
  logger.info(`Server is running on http://localhost:${serverConfig.PORT}`);
  logger.info(`Press Ctrl+C to stop the server.`);
});
