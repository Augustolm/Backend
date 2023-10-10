import UserMongoDAO from "../daos/UserMongoDAO.js";

export default class userServices {
  constructor() {
    this.productDAO = new UserMongoDAO();
  }

  async createUser(user) {
    const result = await this.productDAO.addUser(user);
    return result;
  }

  async getUserById(id) {
    const result = await this.productDAO.getUserById(id);
    return result;
  }

  async getUserByEmail(email) {
    const result = await this.productDAO.getUserByEmail(email);
    return result;
  }

  async updateUser(id, update) {
    const result = await this.productDAO.updateUser(id, update);
    return result;
  }

  async resetPasswordUser(email, code) {
    const result = await this.productDAO.resetPasswordUser(email, code);
    return result;
  }

  async loginUser(email) {
    const result = await this.productDAO.loginUser(email);
    return result;
  }

  async logoutUser(email) {
    const result = await this.productDAO.logoutUser(email);
    return result;
  }

  async getAllUsers() {
    const result = await this.productDAO.getAllUsers();
    return result;
  }

  async getUserLoginOn() {
    const result = await this.productDAO.getUserLoginOn();
    return result;
  }

  async deleteUser(id) {
    const result = await this.productDAO.deleteUser(id);
    return result;
  }
}
