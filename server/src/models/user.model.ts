import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import { EUserRole, UserAttributes, UserCreationAttributes } from "../interfaces/user.interfaces";

// class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
// class User extends Model {
class User extends Model<UserAttributes, UserCreationAttributes> {
  declare id: number;
  declare name: string;
  declare phoneNumber: string;
  declare city: string;
  declare email: string;
  declare role: EUserRole;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
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
    role: {
      type: DataTypes.ENUM,
      values: [EUserRole.CLIENT, EUserRole.HELPER],
    },
  },
  {
    sequelize,
    // tableName: "users",
    timestamps: true,
  }
);

export default User;
