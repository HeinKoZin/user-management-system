import { UserModel } from "@models/user";
import { create, remove, update, users } from "@services/user.service";
import { Request, Response } from "express";

export const getAllUsers = async (req: Request, res: Response) => {
	const { keyword, limit = 20, page = 1 } = req.query;

	const allUsers = await users(
		keyword?.toString(),
		parseInt(limit.toString()),
		parseInt(page.toString())
	);

	res.json(allUsers);
};

export const createUser = async (req: Request, res: Response) => {
	try {
		const input = UserModel.parse(req.body);

		const user = await create(input);
		res.json(user);
	} catch (error) {
		res.json(error);
	}
};

export const updateUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const input = req.body;
		const user = await update(parseInt(id), input);
		res.json(user);
	} catch (error) {
		res.json(error);
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const user = await remove(parseInt(id));
		res.json(user);
	} catch (error) {
		res.json(error);
	}
};

// export const searchUser = async (req: Request, res: Response) => {
// 	try {
// 		const { keyword } = req.query;
// 		const users = await search(keyword?.toString());
// 		res.json(users);
// 	} catch (error) {}
// };
