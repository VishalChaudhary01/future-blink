import mongoose from "mongoose";
import { Env } from "./Env";

export const connectDB = async () => {
  try {
    await mongoose.connect(Env.DATABASE_URL);
    console.log("Database connected");
  } catch (error) {
    console.error("Failed to connect to database", error);
    process.exit(1);
  }
};
