import { LoginInput } from "@dtos/auth/login.input";
import { accountLogin } from "@repositories/auth.repository";

export const login = async (data: LoginInput) => {
	const login = await accountLogin(data);
	return login;
};
