import userModel from "../models/user.model.js";

class userManagerDb {
  constructor() {
    this.userModel = userModel;
  }

  getUser = async (filter) => await this.userModel.findOne(filter).lean();

  getUserById = async (id) => await this.userModel.findById(id);

  createUser = async (newUser) => await this.userModel.create(newUser);

  makeUserPremium = async (email) =>
    await this.userModel.updateOne(
      { email: email },
      { $set: { role: "premium" } }
    );
  updatePassword = async (email, password) =>
    await this.userModel.updateOne(
      { email: email },
      { $set: { password: password } }
    );
}

export default userManagerDb;
