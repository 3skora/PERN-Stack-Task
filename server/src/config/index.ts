import { config } from "dotenv";
config({ path: ".env" });

export const CREDENTIALS = process.env.CREDENTIALS === "true";
export const {
  NODE_ENV,
  PORT,
  PROD_DATABASE_URI,
  DEV_DATABASE_URI,
  PROD_UPLOAD_URL,
  DEV_UPLOAD_URL,
  PROD_ORIGIN,
  DEV_ORIGIN,
} = process.env;

export const env = NODE_ENV || "development";
export const port = PORT || 3002;
// export const databaseURI = env == 'production' ? PROD_DATABASE_URI : DEV_DATABASE_URI;
// export const uploadURL = env == 'production' ? PROD_UPLOAD_URL : DEV_UPLOAD_URL;
// export const origin = env == 'production' ? PROD_ORIGIN : DEV_ORIGIN;
