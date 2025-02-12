import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });

export default defineConfig({
  dialect: "postgresql",
  out: "./migration",
  schema: ["./schema/user.js", "./schema/lifeline.js"], // Include multiple schema files
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
