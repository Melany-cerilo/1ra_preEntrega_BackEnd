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
}

export default UserRepository;
