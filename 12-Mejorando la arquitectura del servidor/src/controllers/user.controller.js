import userServices from "../services/user.services.js";

export default class userController {
  constructor() {
    this.userController = new userServices();
  }

  async createUserController(user) {
    const result = await this.userController.createUser(user);
    return result;
  }

  async getUserByIdController(id) {
    if (!id) {
      return { error: "No se encontró el usuario" };
    }
    const result = await this.userController.getUserById(id);
    return result;
  }

  async getUserByEmailController(email) {
    if (!email) {
      return { error: "No se encontró el usuario" };
    }
    const result = await this.userController.getUserByEmail(email);
    return result;
  }

  async updateUserController(id, update) {
    const result = await this.userController.updateUser(id, update);
    return result;
  }
}
