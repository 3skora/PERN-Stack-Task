import express from "express";
import cors from "cors";
import { port } from "./config";
import sequelize from "./config/database";
import User from "./models/user.model";
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

// export const seedDatabase = async () => {
//   try {
//     await User.create({
//       name: "John Doe",
//       phoneNumber: "123456789",
//       city: "New York",
//       email: "john.doe@example.com",
//     });
//   } catch (error) {
//     console.log("🚀 ~ file: app.ts:27 ~ seedDatabase ~ error:", error);
//   }
// };

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
