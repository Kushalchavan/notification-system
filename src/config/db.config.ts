// db/connection.ts
import { Pool } from "pg";
import { serverConfig } from "./env.config";

export const pool = new Pool({
  connectionString: serverConfig.DATABASE_URL,
});
