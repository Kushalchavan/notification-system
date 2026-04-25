import { pool } from "./db.config";
import logger from "./logger.config";

export const connectDB = async () => {
  try {
    const client = await pool.connect();
    logger.error("✅ DB connected successfully");
    client.release();
  } catch (error) {
    logger.error("❌ DB connection failed", error);
    process.exit(1);
  }
};
