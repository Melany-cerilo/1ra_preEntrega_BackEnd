class MessageRepository {
  constructor(dao) {
    this.dao = dao;
  }
  addMessage(newAdd) {
    return this.dao.addMessage(newAdd);
  }

  getMesagges() {
    return this.dao.getMesagges();
  }

  getMesaggesById(idMessage) {
    return this.dao.getMesaggesById(idMessage);
  }

  async deleteMessage(idMessage) {
    return this.dao.deleteMessage(idMessage);
  }
}

export default MessageRepository;
