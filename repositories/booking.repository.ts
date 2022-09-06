import { CreateBookingInput } from "@dtos/booking/create_booking.input";
import { UpdateBookingInput } from "@dtos/booking/update_booking.input";
import prismaService from "@services/prisma.service";

export const getAllBookings = async (
	keyword?: string,
	limit = 20,
	page = 1
) => {
	try {
		const totalBookings = await prismaService.booking.count();
		const bookings = keyword
			? await prismaService.booking.findMany({
					where: {
						OR: [
							{ car_no: { contains: keyword } },
							{
								customer: {
									name: {
										contains: keyword,
									},
									email: {
										contains: keyword,
									},
								},
							},
							{
								note: {
									contains: keyword,
								},
							},
						],
					},
					skip: page === 1 ? 0 : limit * (page - 1),
					take: limit,
			  })
			: await prismaService.booking.findMany({
					skip: page === 1 ? 0 : limit * (page - 1),
					take: limit,
			  });

		return bookings.length === 0
			? {
					success: true,
					message: "No booking found!",
			  }
			: {
					success: true,
					message: "All bookings successfully retrieved",
					data: bookings,
					pagination: {
						page,
						limit,
						total_page: Math.ceil(totalBookings / limit),
						total_items: totalBookings,
					},
			  };
	} catch (error) {
		return {
			success: false,
			message: error,
		};
	}
};

export const getBooking = async (bookingId: number) => {
	const booking = await prismaService.booking.findUnique({
		where: {
			id: bookingId,
		},
	});

	return booking;
};

export const createBooking = async (data: CreateBookingInput) => {
	try {
		const create = await prismaService.booking.create({
			data,
		});

		if (create) {
			return {
				success: true,
				message: "Booking successfully created.",
				data: create,
			};
		}
	} catch (error) {
		return {
			success: false,
			message: error,
		};
	}
};

export const updateBooking = async (
	bookingId: number,
	data: UpdateBookingInput
) => {
	const existingBooking = await getBooking(bookingId);

	if (!existingBooking) {
		return {
			success: true,
			message: "No booking found!",
		};
	}

	try {
		const update = await prismaService.booking.update({
			where: {
				id: bookingId,
			},
			data: {
				...data,
			},
		});

		if (update) {
			return {
				success: true,
				message: "Booking successfully updated.",
				data: update,
			};
		}
	} catch (error) {
		return {
			success: false,
			message: error,
		};
	}
};

export const deleteBooking = async (bookingId: number) => {
	const existingBooking = await getBooking(bookingId);
	if (!existingBooking) {
		return {
			success: false,
			message: "No booking found!",
		};
	}

	try {
		const remove = await prismaService.booking.delete({
			where: {
				id: bookingId,
			},
		});

		if (remove) {
			return {
				success: true,
				message: "Booking successfully deleted.",
			};
		}
	} catch (error) {
		return {
			success: false,
			message: error,
		};
	}
};
