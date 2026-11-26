const configuredApiUrl = import.meta.env.VITE_API_URL;
const defaultApiUrl = import.meta.env.PROD
  ? "https://stacks-library-catalog.vercel.app"
  : "http://localhost:3000";

export const API_URL = (configuredApiUrl || defaultApiUrl).replace(/\/+$/, "");
