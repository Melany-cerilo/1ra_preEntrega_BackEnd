import ticketsModel from "../models/ticket.model.js";

class ticketManagerDb {
  addTicket(ticket) {
    //Metodo para agregar un carrito vacio a la coleccion de carritos en la DB.
    try {
      return ticketsModel.create(ticket);
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export default ticketManagerDb;
