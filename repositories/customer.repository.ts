import { CreateCustomerInputInterface } from "@dtos/customer/create_customer.input";
import { UpdateCustomerInputInterface } from "@dtos/customer/update_customer.input";
import { SearchByKeywordInput } from "@dtos/search_by_keyword.input";
import prismaService from "@services/prisma.service";

export const getAllCustomer = async (
	keyword?: string,
	limit = 20,
	page = 1
) => {
	const totalCustomers = await prismaService.customer.count();
	const customers = keyword
		? await prismaService.customer.findMany({
				where: {
					OR: [
						{ email: { contains: keyword } },
						{ name: { contains: keyword } },
					],
				},
				skip: page === 1 ? 0 : limit * (page - 1),
				take: limit,
		  })
		: await prismaService.customer.findMany({
				skip: page === 1 ? 0 : limit * (page - 1),
				take: limit,
		  });

	return customers.length === 0
		? {
				success: true,
				message: "No customer found!",
		  }
		: {
				success: true,
				message: "All customers successfully retrieved",
				data: customers,
				pagination: {
					page: page,
					limit: page,
					total_page: Math.ceil(totalCustomers / limit),
					total_items: totalCustomers,
				},
		  };
};

export const createCustomer = async (data: CreateCustomerInputInterface) => {
	try {
		const customer = await prismaService.customer.create({
			data,
		});
		return {
			success: true,
			message: "Customer successfully created.",
			data: customer,
		};
	} catch (error) {
		return {
			success: false,
			message: error,
		};
	}
};

export const getCustomer = async (
	customerId?: number,
	customerEmail?: string
) => {
	const user = await prismaService.customer.findUnique({
		where: {
			id: customerId,
			email: customerEmail,
		},
	});

	return user;
};

export const updateCustomer = async (
	customerId: number,
	data: UpdateCustomerInputInterface
) => {
	const existingCustomer = await getCustomer(customerId);

	if (!existingCustomer) {
		return {
			success: false,
			message: "No customer found!",
		};
	}

	try {
		const customer = await prismaService.customer.update({
			where: {
				id: customerId,
			},
			data,
		});
		return {
			success: true,
			message: "Customer successfully updated.",
			data: customer,
		};
	} catch (error) {
		return {
			success: false,
			message: error,
		};
	}
};

export const deleteCustomer = async (customerId: number) => {
	const existingCustomer = await getCustomer(customerId);
	if (!existingCustomer) {
		return {
			success: false,
			message: "No customer found!",
		};
	}
	try {
		const deletedCustomer = await prismaService.customer.delete({
			where: {
				id: customerId,
			},
		});

		if (deletedCustomer) {
			return {
				success: true,
				message: "Customer successfully deleted!",
			};
		}
	} catch (error) {
		return {
			success: false,
			message: error,
		};
	}
};
