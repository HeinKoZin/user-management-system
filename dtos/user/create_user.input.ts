import { UserRole } from "@prisma/client";

export interface CreateUserInput {
	name: string;
	email: string;
	password: string;
	role?: UserRole;
}
