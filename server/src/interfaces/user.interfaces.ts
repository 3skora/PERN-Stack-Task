import { Optional } from "sequelize";

export enum EUserRole {
  HELPER = "helper",
  CLIENT = "client",
}

export interface UserAttributes {
  id: number;
  name: string;
  phoneNumber: string;
  city: string;
  email: string;
  role: EUserRole;
}

export interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}
