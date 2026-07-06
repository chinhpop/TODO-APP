import axios from "axios";

const metaEnv = (import.meta as ImportMeta & { env?: Record<string, string | boolean | undefined> }).env ?? {};
const envMode = String(metaEnv.VITE_APP_MODE ?? metaEnv.MODE ?? "production").toLowerCase();
const isDeveloperMode = envMode === "developer" || envMode === "development";

export const api = axios.create({
  baseURL: isDeveloperMode ? "http://localhost:5001/api" : "/api",
  headers: { "Content-Type": "application/json" },
});
