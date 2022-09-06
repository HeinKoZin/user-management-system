import { CreateServiceInput } from "@dtos/service/create_service.input";
import { UpdateServiceInput } from "@dtos/service/update_service.input";
import prismaService from "@services/prisma.service";

export const getAllServices = async () => {
	try {
		const services = await prismaService.service.findMany({});

		if (services.length === 0) {
			return {
				success: true,
				message: "No services found!.",
			};
		}

		return {
			success: true,
			message: "All services successfully retrieved.",
			data: services,
		};
	} catch (error) {
		return {
			success: false,
			message: error,
		};
	}
};

export const createService = async (data: CreateServiceInput) => {
	try {
		const create = await prismaService.service.create({
			data,
		});

		return {
			success: true,
			message: "Service successfully created.",
			data: create,
		};
	} catch (error) {
		return {
			success: false,
			message: error,
		};
	}
};

export const updateService = async (
	serviceId: number,
	data: UpdateServiceInput
) => {
	try {
		const create = await prismaService.service.update({
			where: {
				id: serviceId,
			},
			data: {
				...data,
			},
		});

		return {
			success: true,
			message: "Service successfully updated.",
			data: create,
		};
	} catch (error) {
		return {
			success: false,
			message: error,
		};
	}
};

export const deleteService = async (serviceId: number) => {
	try {
		await prismaService.service.delete({
			where: { id: serviceId },
		});

		return {
			success: true,
			message: "Service successfully deleted.",
		};
	} catch (error) {
		return {
			success: false,
			message: error,
		};
	}
};
