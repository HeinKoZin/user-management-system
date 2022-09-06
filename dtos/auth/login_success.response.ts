import { User } from "@prisma/client";

export interface LoginSuccessInterface {
	success?: boolean;
	message?: any;
	data?: Data;
}

interface Data {
	user: User;
	token: string;
}
