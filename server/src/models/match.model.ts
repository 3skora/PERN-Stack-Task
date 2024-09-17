import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import User from "./user.model";
import { MatchAttributes, MatchCreationAttributes } from "../interfaces/match.interfaces";

class Match extends Model<MatchAttributes, MatchCreationAttributes> {
  declare id: number;
  declare clientId: number;
  declare helperId: number;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Match.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    clientId: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: User,
        key: "id",
      },
      allowNull: false,
    },
    helperId: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: User,
        key: "id",
      },
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
  }
);

export default Match;
