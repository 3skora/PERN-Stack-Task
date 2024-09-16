import { Optional } from "sequelize";

export interface MatchAttributes {
  id: number;
  clientId: number;
  helperId: number;
}

export interface MatchCreationAttributes extends Optional<MatchAttributes, "id"> {}
