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

  async makeUserPremium(email) {
    return await this.dao.makeUserPremium(email);
  }

  async updatePassword(email, password) {
    return await this.dao.updatePassword(email, password);
  }
}

export default UserRepository;
