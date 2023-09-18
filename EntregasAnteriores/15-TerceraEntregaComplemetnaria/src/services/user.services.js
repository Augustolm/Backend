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
}
