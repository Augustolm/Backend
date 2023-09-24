import userServices from "../services/user.services.js";
import { encryptPassword } from "../utils/logicPassword.js";

export default class userController {
  constructor() {
    this.userController = new userServices();
  }

  async createUserController(user) {
    const result = await this.userController.createUser(user);
    return result;
  }

  async getUserByIdController(id) {
    const result = await this.userController.getUserById(id);
    console.log("result", result);
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

  async updatePasswordController(email, code) {
    if (!email || !code) {
      throw CustomError.crearError({
        name: "UserNotFoundError",
        mensaje: "email o code, no proporcionado",
        codigo: EErrors.USER_NOT_FOUND,
      });
    }

    const hashedPassword = await encryptPassword(code);

    const result = await this.userController.resetPasswordUser(
      email,
      hashedPassword
    );
    return result;
  }
}
