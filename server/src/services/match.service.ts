import { MatchCreationAttributes } from "../interfaces/match.interfaces";
import User from "../models/user.model";
import Match from "../models/match.model";
import { EUserRole } from "../interfaces/user.interfaces";

class MatchService {
  async getMatch(query: Partial<MatchCreationAttributes>) {
    return await Match.findAll({
      where: query,
      include: [
        {
          model: User,
          as: "client",
          attributes: ["id", "name", "phoneNumber", "city", "email", "role"],
        },
        {
          model: User,
          as: "helper",
          attributes: ["id", "name", "phoneNumber", "city", "email", "role"],
        },
      ],
      attributes: {
        exclude: ["clientId", "helperId"],
      },
    });
  }

  async getMatchById(id: number) {
    return await Match.findByPk(id);
  }

  async createMatch(data: MatchCreationAttributes) {
    const { clientId, helperId } = data;
    const client = await User.findOne({ where: { id: clientId, role: EUserRole.CLIENT } });
    const helper = await User.findOne({ where: { id: helperId, role: EUserRole.HELPER } });

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
