import userModel from "../models/user.model.js";

class userManagerDb {
  constructor() {
    this.userModel = userModel;
  }
  getUsers = async (filter) => await this.userModel.find(filter).lean();

  getUser = async (filter) => await this.userModel.findOne(filter).lean();

  getUserById = async (id) => await this.userModel.findById(id);

  createUser = async (newUser) => {
    try {
      return await this.userModel.create(newUser);
    } catch (error) {
      console.log(error);
    }
  };
  updateUser = async (userId, user) =>
    await this.userModel.updateOne({ _id: userId }, user);

  makeUserPremium = async (id) =>
    await this.userModel.updateOne({ _id: id }, { $set: { role: "premium" } });
  updatePassword = async (email, password) =>
    await this.userModel.updateOne(
      { email: email },
      { $set: { password: password } }
    );

  deleteUsers = async (userKeys) => {
    try {
      return await this.userModel.deleteMany({ _id: { $in: userKeys } });
    } catch (error) {
      console.log(error);
    }
  };
}

export default userManagerDb;
