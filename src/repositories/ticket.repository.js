class TicketRepository {
  constructor(dao) {
    this.dao = dao;
  }
  addTicket(ticket) {
    return this.dao.addTicket(ticket);
  }
}

export default TicketRepository;
