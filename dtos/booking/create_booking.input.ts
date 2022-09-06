import { Booking } from "@prisma/client";

export interface CreateBookingInput
	extends Omit<Booking, "id" | "createdAt" | "updatedAt"> {}
