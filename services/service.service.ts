import { CreateServiceInput } from "@dtos/service/create_service.input";
import { UpdateServiceInput } from "@dtos/service/update_service.input";
import {
	createService,
	deleteService,
	getAllServices,
	updateService,
} from "@repositories/service.repository";

export const services = async () => {
	return await getAllServices();
};

export const create = async (data: CreateServiceInput) => {
	return await createService(data);
};

export const update = async (serviceId: number, data: UpdateServiceInput) => {
	return await updateService(serviceId, data);
};

export const remove = async (serviceId: number) => {
	return await deleteService(serviceId);
};
