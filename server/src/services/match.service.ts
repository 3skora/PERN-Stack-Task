import { MatchCreationAttributes } from "../interfaces/match.interfaces";
import User from "../models/user.model";
import Match from "../models/match.model";

class MatchService {
  async getMatch(query: Partial<MatchCreationAttributes>) {
    return await Match.findAll({ where: query });
  }

  async getMatchById(id: number) {
    return await Match.findByPk(id);
  }

  async createMatch(data: MatchCreationAttributes) {
    const { clientId, helperId } = data;
    const client = await User.findOne({ where: { id: clientId, role: "CLIENT" } });
    const helper = await User.findOne({ where: { id: helperId, role: "HELPER" } });

    if (!client) {
      throw new Error("Client not found");
    }
    if (!helper) {
      throw new Error("Helper not found");
    }

    if (client.city !== helper.city) {
      throw new Error("Client and Helper must be from the same city");
    }
    return await Match.create(data);
  }

  async updateMatch(id: number, data: Partial<MatchCreationAttributes>) {
    const match = await this.getMatchById(id);
    if (!match) throw new Error("Match not found");
    return await match.update(data);
  }

  async deleteMatch(id: number) {
    const match = await this.getMatchById(id);
    if (!match) throw new Error("Match not found");
    await match.destroy();
  }
}

export default new MatchService();
