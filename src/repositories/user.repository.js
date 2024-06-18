class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }
  async getUser(filter) {
    return await this.dao.getUser(filter);
  }

  async getUserById(id) {
    return await this.dao.getUserById(id);
  }

  async createUser(newUser) {
    return await this.dao.createUser(newUser);
  }
  async updateUser(userId, user) {
    return await this.dao.updateUser({ _id: userId }, user);
  }
  async makeUserPremium(id) {
    return await this.dao.makeUserPremium(id);
  }

  async updatePassword(email, password) {
    return await this.dao.updatePassword(email, password);
  }
}

export default UserRepository;
