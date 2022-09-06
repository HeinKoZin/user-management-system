import { CreateCustomerInputInterface } from "@dtos/customer/create_customer.input";
import { UpdateCustomerInputInterface } from "@dtos/customer/update_customer.input";
import { SearchByKeywordInput } from "@dtos/search_by_keyword.input";
import { accountLogin } from "@repositories/auth.repository";
import {
	createCustomer,
	deleteCustomer,
	getAllCustomer,
	updateCustomer,
} from "@repositories/customer.repository";

export const customers = async (
	keyword?: string,
	limit?: number,
	page?: number
) => {
	const customers = await getAllCustomer(keyword, limit, page);
	return customers;
};

export const create = async (data: CreateCustomerInputInterface) => {
	const customers = await createCustomer(data);
	return customers;
};

export const update = async (
	customerId: number,
	data: UpdateCustomerInputInterface
) => {
	const update = await updateCustomer(customerId, data);
	return update;
};

export const remove = async (customerId: number) => {
	const remove = await deleteCustomer(customerId);
	return remove;
};
