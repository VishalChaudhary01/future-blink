import { getEnv } from "@/utils/getEnv";

export const Env = {
  PORT: getEnv("PORT"),
  DATABASE_URL: getEnv("DATABASE_URL"),
  OPENROUTER_API_KEY: getEnv("OPENROUTER_API_KEY"),
} as const;
