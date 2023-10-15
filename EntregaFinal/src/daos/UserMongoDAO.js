import { userModel } from "./model/user.model.js";

export default class UserMongoDAO {
  constructor() {
    this.User = userModel;
  }

  async addUser(user) {
    const result = await this.User.create(user);
    return result;
  }

  async getAllUsers() {
    const result = await this.User.find();
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
      const result = await this.User.findOneAndUpdate(
        { email },
        {
          $set: { password: code },
          $currentDate: { lastModified: true },
          $inc: { __v: 1 },
        }
      );
      return result;
    } catch (error) {
      console.log("error", error);
    }
  }

  async updateUser(id, update) {
    const result = await this.User.findByIdAndUpdate(id, update);
    return result;
  }

  async loginUser(email) {
    const user = await this.User.findOne({ email });
    if (user) {
      user.last_connection = [{ action: "login", date: new Date() }];
      await user.save();
      return user;
    }
    return null;
  }

  async logoutUser(email) {
    const user = await this.User.findOne({ email });
    if (user) {
      user.last_connection = [{ action: "logout", date: new Date() }];
      await user.save();
      return user;
    }
    return null;
  }

  async getUserLoginOn() {
    try {
      const users = await this.User.find({
        last_connection: {
          $elemMatch: {
            action: "login",
          },
        },
        rol: {
          $ne: "admin",
        },
      });

      return users;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  async deleteUser(id) {
    const result = await this.User.findByIdAndDelete(id);
    return result;
  }
}
