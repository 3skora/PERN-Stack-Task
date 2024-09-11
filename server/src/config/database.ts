import { Sequelize } from "sequelize";
import { dbConfig } from "./index";

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: "postgres",
});

export default sequelize;
