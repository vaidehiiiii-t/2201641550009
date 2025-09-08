import { createLogger } from "logging-middleware";

const logger = createLogger({
  baseUrl: import.meta.env.VITE_AFFORDMED_BASE_URL,
  endpoint: import.meta.env.VITE_LOG_ENDPOINT,
  token: import.meta.env.VITE_AFFORDMED_ACCESS_TOKEN,
});

export const Log = logger.Log;
