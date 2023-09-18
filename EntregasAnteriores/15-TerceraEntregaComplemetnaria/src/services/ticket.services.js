import TicketMongoDAO from "../daos/TicketMongoDAO.js";

export default class ticketServices {
  constructor() {
    this.ticketDAO = new TicketMongoDAO();
  }

  async createTicket(ticket) {
    const result = await this.ticketDAO.createTicket(ticket);
    return result;
  }

  async getTicketById(id) {
    const result = await this.ticketDAO.getById(id);
    return result;
  }
}
