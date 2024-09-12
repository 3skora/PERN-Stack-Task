import { UserCreationAttributes } from "../interfaces/user.interfaces";
import User from "../models/user.model";

class UserService {
  async getUsers(query: Partial<UserCreationAttributes>) {
    return await User.findAll({ where: query });
  }

  async getUserById(id: number) {
    return await User.findByPk(id);
  }

  async createUser(data: UserCreationAttributes) {
    return await User.create(data);
  }

  async updateUser(id: number, data: Partial<UserCreationAttributes>) {
    const user = await this.getUserById(id);
    if (!user) throw new Error("User not found");
    return await user.update(data);
  }

  async deleteUser(id: number) {
    const user = await this.getUserById(id);
    if (!user) throw new Error("User not found");
    await user.destroy();
  }
}

export default new UserService();
