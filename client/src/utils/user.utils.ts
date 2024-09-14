import { IUser, IUserRecord } from "../interfaces/user.interfaces";

export const mapUserRecordToUser = (userRecord: IUserRecord): IUser => {
  const { id, createdAt, updatedAt, ...user } = userRecord;
  return user;
};
