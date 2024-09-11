import { Optional } from "sequelize";

export interface UserAttributes {
  id: number;
  name: string;
  phoneNumber: string;
  city: string;
  email: string;
}

export interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}
