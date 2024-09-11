import { config } from "dotenv";
config({ path: ".env" });

export const {
  NODE_ENV,
  PORT,

  DEV_DB_USER,
  DEV_DB_PASS,
  DEV_DB_NAME,
  DEV_DB_HOST,

  TEST_DB_USER,
  TEST_DB_PASS,
  TEST_DB_NAME,
  TEST_DB_HOST,

  PROD_DB_USER,
  PROD_DB_PASS,
  PROD_DB_NAME,
  PROD_DB_HOST,
} = process.env;

export const env = NODE_ENV || "development";
export const port = PORT || 3002;

const dbConfigs = {
  development: {
    username: DEV_DB_USER,
    password: DEV_DB_PASS,
    database: DEV_DB_NAME,
    host: DEV_DB_HOST,
  },
  test: {
    username: TEST_DB_USER,
    password: TEST_DB_PASS,
    database: TEST_DB_NAME,
    host: TEST_DB_HOST,
  },
  production: {
    username: PROD_DB_USER,
    password: PROD_DB_PASS,
    database: PROD_DB_NAME,
    host: PROD_DB_HOST,
  },
};

export const dbConfig = dbConfigs[env];
// export const databaseURI = env == 'production' ? PROD_DATABASE_URI : DEV_DATABASE_URI;
// export const uploadURL = env == 'production' ? PROD_UPLOAD_URL : DEV_UPLOAD_URL;
// export const origin = env == 'production' ? PROD_ORIGIN : DEV_ORIGIN;
