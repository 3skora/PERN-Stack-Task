import { Model, DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/database";
import { UserAttributes, UserCreationAttributes } from "@/interfaces/user.interfaces";

// class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
class User extends Model {
  public id: number;
  public name: string;
  public phoneNumber: string;
  public city: string;
  public email: string;

  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
  }
);

export default User;
