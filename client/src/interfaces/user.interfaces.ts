import { IRow } from "./row.interfaces";

export enum EUserRole {
  HELPER = "helper",
  CLIENT = "client",
}
export interface IUser {
  name: string;
  phoneNumber: string;
  city: string;
  email: string;
  role: EUserRole;
}

export interface IUserRecord extends IRow, IUser {}
