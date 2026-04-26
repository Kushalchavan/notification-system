import express from "express";
import morgan from "morgan";
import logger from "./config/logger.config";
import { serverConfig } from "./config/index";
import {
  appErrorHandler,
  genericErrorHandler,
} from "./middlewares/error.middleware";
import notificationRouter from "./routes/notification.route";
import { connectDB } from "./config/db.init";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

const startServer = async () => {
  try {
    await connectDB();

    app.get("/", (req, res) => {
      res.send("Welcome to the notifications system!");
    });

    app.use("/api/v1", notificationRouter);

    // error handling middleware should be registered after all routes
    app.use(appErrorHandler);
    app.use(genericErrorHandler);

    app.listen(serverConfig.PORT, () => {
      logger.info(`Server is running on http://localhost:${serverConfig.PORT}`);
      logger.info("Press CTRL+C to stop the server");
    });
  } catch (error) {
    logger.error("Failed to start server", error);
    process.exit(1);
  }
};

startServer();
