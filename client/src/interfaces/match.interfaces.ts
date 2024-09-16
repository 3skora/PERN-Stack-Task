import { IRow } from "./row.interfaces";

export interface IMatch {
  clientId: number;
  helperId: number;
}

export interface IMatchRecord extends IRow, IMatch {}
