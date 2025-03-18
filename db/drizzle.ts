// import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import { config } from "dotenv";

config({ path: ".env" });

export const db = drizzle(process.env.DATABASE_URL!);
// export const db = drizzle({ client: sql });
