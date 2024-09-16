import User from "./user.model";
import Match from "./match.model";

// A client can have multiple matched helpers
User.belongsToMany(User, { through: Match, as: "Helpers", foreignKey: "clientId", otherKey: "helperId" });
// A helper can be matched with multiple clients
User.belongsToMany(User, { through: Match, as: "Clients", foreignKey: "helperId", otherKey: "clientId" });

export { User, Match };
