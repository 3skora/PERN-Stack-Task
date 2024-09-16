import { Request, Response } from "express";
import MatchService from "../services/match.service";
import { MatchCreationAttributes } from "../interfaces/match.interfaces";

class MatchController {
  async getMatch(req: Request, res: Response) {
    try {
      const query = req.query as Record<string, string>;
      const match = await MatchService.getMatch(query);
      return res.status(200).json(match);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getMatchById(req: Request, res: Response) {
    try {
      const match = await MatchService.getMatchById(parseInt(req.params.id));
      if (!match) return res.status(404).json({ message: "Match not found" });
      return res.status(200).json(match);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async createMatch(req: Request, res: Response) {
    try {
      const data: MatchCreationAttributes = req.body;
      const match = await MatchService.createMatch(data);
      return res.status(201).json(match);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async updateMatch(req: Request, res: Response) {
    try {
      const data: Partial<MatchCreationAttributes> = req.body;
      const match = await MatchService.updateMatch(parseInt(req.params.id), data);
      return res.status(200).json(match);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async deleteMatch(req: Request, res: Response) {
    try {
      await MatchService.deleteMatch(parseInt(req.params.id));
      return res.status(204).json();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new MatchController();
