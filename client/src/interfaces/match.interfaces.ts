import { IRow } from "./row.interfaces";
import { IUserRecord } from "./user.interfaces";

export interface IMatch {
  clientId: number;
  helperId: number;
}
export interface IMatchPopulated {
  client: IUserRecord;
  helper: IUserRecord;
}

export interface IMatchRecord extends IRow, IMatch {}
export interface IMatchPopulatedRecord extends IRow, IMatchPopulated {}
