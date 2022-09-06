import { UserModel } from "@models/user";
import { login } from "@services/auth.service";
import { create, remove, update, users } from "@services/user.service";
import { Request, Response } from "express";
import * as z from "zod";

export const accountLogin = async (req: Request, res: Response) => {
	const LoginModel = z.object({
		email: z.string().email(),
		password: z.string(),
	});

	try {
		const input = LoginModel.parse(req.body);
		const accountLogin = await login(input);
		res.json(accountLogin);
	} catch (error) {
		res.json(error);
	}
};
