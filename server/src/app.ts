import express from "express";
import cors from "cors";
import { port } from "./config";
import sequelize from "./config/database";
import { TRoute } from "./routes";

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
  try {
    await sequelize.sync();
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Unable to sync the database:", error);
  }
};

export const initializeMiddlewares = () => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};

export const initializeRoutes = (routes: TRoute[]) => {
  routes.forEach((route) => {
    app.use("/api", route.router);
  });
};

export const listen = () => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
