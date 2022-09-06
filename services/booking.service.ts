import { CreateBookingInput } from "@dtos/booking/create_booking.input";
import { UpdateBookingInput } from "@dtos/booking/update_booking.input";
import {
	createBooking,
	deleteBooking,
	getAllBookings,
	updateBooking,
} from "@repositories/booking.repository";

export const bookings = async (
	keyword?: string,
	limit?: number,
	page?: number
) => {
	return await getAllBookings(keyword, limit, page);
};

export const create = async (data: CreateBookingInput) => {
	return await createBooking(data);
};

export const update = async (bookingId: number, data: UpdateBookingInput) => {
	return await updateBooking(bookingId, data);
};

export const remove = async (bookingId: number) => {
	return await deleteBooking(bookingId);
};
