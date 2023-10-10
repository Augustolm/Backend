import { ticketModel } from "./model/ticket.model.js";

export default class TicketMongoDAO {
  constructor() {
    this.Ticket = ticketModel;
  }

  async getById(id) {
    return await this.Ticket.findOne({ code: id });
  }

  async createTicket(data) {
    return await this.Ticket.create(data);
  }
}
