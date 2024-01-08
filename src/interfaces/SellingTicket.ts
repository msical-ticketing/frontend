import { Ticket } from './Ticket'

export interface SellingTicket extends Ticket {
	eventId: string
	totalSupply: string
	soldQuantity: string
	price: string
	uri: string
}
