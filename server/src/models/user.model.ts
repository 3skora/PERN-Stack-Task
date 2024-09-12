import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import { UserAttributes, UserCreationAttributes } from "../interfaces/user.interfaces";

// class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
// class User extends Model {
class User extends Model<UserAttributes, UserCreationAttributes> {
  declare id: number;
  declare name: string;
  declare phoneNumber: string;
  declare city: string;
  declare email: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
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
      validate: {
        isEmail: true,
      },
    },
  },
  {
    sequelize,
    // tableName: "users",
    timestamps: true,
  }
);

export default User;
