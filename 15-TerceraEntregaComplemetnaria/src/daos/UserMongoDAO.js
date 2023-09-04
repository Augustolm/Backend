import { userModel } from "./model/user.model.js";

export default class UserMongoDAO {
  constructor() {
    this.User = userModel;
  }

  async addUser(user) {
    const result = await this.User.create(user);
    return result;
  }

  async getUserById(id) {
    const result = await this.User.findById(id);
    return result;
  }

  async getUserByEmail(email) {
    const result = await this.User.findOne({ email });
    return result;
  }

  async resetPasswordUser(email, code) {
    try {
      console.log("email", email);
      console.log("code", code);
      const result = await this.User.findOneAndUpdate(
        { email },
        {
          $set: { password: code },
          $currentDate: { lastModified: true },
          $inc: { __v: 1 },
        }
      );
      console.log("result desde restePasswrodUser", result);
      return result;
    } catch (error) {
      console.log("error", error);
    }
  }

  async updateUser(id, update) {
    const result = await this.User.findByIdAndUpdate(id, update);
    return result;
  }
}
