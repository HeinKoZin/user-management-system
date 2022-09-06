import { CreateUserInput } from "@dtos/user/create_user.input";
import { UpdateUserInput } from "@dtos/user/update_user.input";
import {
	allUsers,
	createUser,
	deleteUser,
	updateUser,
} from "@repositories/user.repository";
import bcrypt from "bcrypt";

export const users = async (
	keyword?: string,
	limit?: number,
	page?: number
) => {
	return await allUsers(keyword, limit, page);
};

export const create = async (user: CreateUserInput) => {
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);
	const create = await createUser(user);
	return create;
};

export const update = async (userId: number, user: UpdateUserInput) => {
	const update = await updateUser(userId, user);
	return update;
};

export const remove = async (userId: number) => {
	const remove = await deleteUser(userId);

	return remove;
};
