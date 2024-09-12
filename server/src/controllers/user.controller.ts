import { Request, Response } from "express";
import UserService from "../services/user.service";
import { UserCreationAttributes } from "../interfaces/user.interfaces";

class UserController {
  async getUsers(req: Request, res: Response) {
    try {
      const query = req.query as Record<string, string>;
      const users = await UserService.getUsers(query);
      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const user = await UserService.getUserById(parseInt(req.params.id));
      if (!user) return res.status(404).json({ message: "User not found" });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const data: UserCreationAttributes = req.body;
      const user = await UserService.createUser(data);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const data: Partial<UserCreationAttributes> = req.body;
      const user = await UserService.updateUser(parseInt(req.params.id), data);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      await UserService.deleteUser(parseInt(req.params.id));
      return res.status(204).json();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new UserController();
