import { IRow } from "./row.interfaces";

export interface IUser {
  name: string;
  phoneNumber: string;
  city: string;
  email: string;
}

export interface IUserRecord extends IRow, IUser {}
