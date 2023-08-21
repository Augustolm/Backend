import userServices from "../services/user.services.js";

export default class userController {
  constructor() {
    this.userController = new userServices();
  }

  async createUserController(user) {
    if (!user) {
      throw CustomError.crearError({
        name: "UserNotFoundError",
        mensaje: "user, no proporcionado",
        codigo: EErrors.USER_NOT_FOUND,
      });
    }

    const result = await this.userController.createUser(user);
    return result;
  }

  async getUserByIdController(id) {
    if (!id) {
      throw CustomError.crearError({
        name: "UserNotFoundError",
        mensaje: "id, no proporcionado",
        codigo: EErrors.USER_NOT_FOUND,
      });
    }
    const result = await this.userController.getUserById(id);
    return result;
  }

  async getUserByEmailController(email) {
    if (!email) {
      throw CustomError.crearError({
        name: "UserNotFoundError",
        mensaje: "email, no proporcionado",
        codigo: EErrors.USER_NOT_FOUND,
      });
    }
    const result = await this.userController.getUserByEmail(email);
    return result;
  }

  async updateUserController(id, update) {
    if (!id || !update) {
      throw CustomError.crearError({
        name: "UserNotFoundError",
        mensaje: "id o update, no proporcionado",
        codigo: EErrors.USER_NOT_FOUND,
      });
    }
    const result = await this.userController.updateUser(id, update);
    return result;
  }
}
