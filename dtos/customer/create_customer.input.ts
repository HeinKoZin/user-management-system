import { Customer } from "@prisma/client";

export interface CreateCustomerInputInterface
	extends Omit<Customer, "id" | "createdAt" | "updatedAt"> {}
