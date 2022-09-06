import { User } from "@prisma/client";
import { InterfaceType } from "typescript";

export interface AllUsersResponse {
	success?: boolean;
	message?: any;
	data?: User[];
	pagination?: PaginationInterface;
}

export interface PaginationInterface {
	page: number;
	total_page: number;
	total_items: number;
	limit: number;
}
