import {
	createBooking,
	getAllBookings,
	updateBooking,
} from "@controllers/booking.controller";
import { deleteService } from "@controllers/service.controller";
import { Router } from "express";

const bookingRouter = Router();

bookingRouter.get("/", getAllBookings);
bookingRouter.post("/", createBooking);
bookingRouter.patch("/:id", updateBooking);
bookingRouter.delete("/:id", deleteService);

export default bookingRouter;
