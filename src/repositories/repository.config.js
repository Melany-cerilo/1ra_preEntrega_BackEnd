import cartManagerDb from "../dao/mongoDb/cartManagerDb.js";
import ProductManagerDB from "../dao/mongoDb/productManagerDb.js";
import userManagerDB from "../dao/mongoDb/userManagerDb.js";
import messageManagerDB from "../dao/mongoDb/messageManagerDb.js";
import ticketManagerDB from "../dao/mongoDb/ticketManagerDb.js";
import CartRepository from "./cart.repository.js";
import ProductRepository from "./product.repository.js";
import UserRepository from "./user.repository.js";
import MessageRepository from "./message.repository.js";
import TicketRepository from "./ticket.repository.js";

export const cartService = new CartRepository(new cartManagerDb());
export const productService = new ProductRepository(new ProductManagerDB());
export const userService = new UserRepository(new userManagerDB());
export const messageService = new MessageRepository(new messageManagerDB());
export const ticketService = new TicketRepository(new ticketManagerDB());
