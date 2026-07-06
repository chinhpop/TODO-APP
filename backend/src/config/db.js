import mongoose from "mongoose";

let databaseReady = false;

export async function connectToDatabase() {
  const configuredUrl = process.env.MONGO_URL?.trim();
  const fallbackUrl = "mongodb://127.0.0.1:27017/todo-app";
  const candidates = [];

  if (configuredUrl) {
    candidates.push(configuredUrl);
  }

  if (configuredUrl && (configuredUrl.includes("<") || configuredUrl.includes(">") || configuredUrl.includes("db_password"))) {
    console.warn("MONGO_URL contains a placeholder value, trying local MongoDB instead.");
  } else if (!configuredUrl) {
    console.warn("MONGO_URL is not set, trying local MongoDB instead.");
  }

  candidates.push(fallbackUrl);

  for (const mongoUrl of candidates) {
    try {
      await mongoose.connect(mongoUrl);
      databaseReady = true;
      console.log(`Connected to MongoDB at ${mongoUrl}.`);
      return true;
    } catch (error) {
      console.warn(`MongoDB connection failed for ${mongoUrl}: ${error.message}`);
    }
  }

  databaseReady = false;
  console.error("MongoDB connection failed for all configured URLs, falling back to in-memory storage.");
  return false;
}

export function isDatabaseReady() {
  return databaseReady;
}
