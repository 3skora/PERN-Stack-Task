import express from "express";
import { port } from "./config";
import sequelize from "./config/database";

export const app = express();

// Test the database connection
export const testDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export const syncDatabase = async () => {
  await sequelize.sync();
};

export const initializeMiddlewares = () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};

export const listen = () => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
