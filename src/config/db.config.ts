// db/connection.ts
import { Pool } from "pg";
import { serverConfig } from ".";

export const pool = new Pool({
  connectionString: serverConfig.DATABASE_URL,
});
