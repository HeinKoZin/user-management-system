import {
	AllUsersResponse,
	PaginationInterface,
} from "@dtos/user/all_users.response";
import { CreateUserInput } from "@dtos/user/create_user.input";
import { UpdateUserInput } from "@dtos/user/update_user.input";
import prismaService from "@services/prisma.service";

export const allUsers = async (
	keyword?: string,
	limit = 20,
	page = 1
): Promise<AllUsersResponse> => {
	const totalUsers = await prismaService.user.count();
	const users = keyword
		? await prismaService.user.findMany({
				where: {
					OR: [
						{ email: { contains: keyword } },
						{ name: { contains: keyword } },
					],
				},
				skip: page === 1 ? 0 : limit * (page - 1),
				take: limit,
		  })
		: await prismaService.user.findMany({
				skip: page === 1 ? 0 : limit * (page - 1),
				take: limit,
		  });

	return users.length === 0
		? {
				success: true,
				message: "No user found!",
		  }
		: {
				success: true,
				message: "All users successfully retrieved",
				data: users,
				pagination: {
					page,
					limit,
					total_page: Math.ceil(totalUsers / limit),
					total_items: totalUsers,
				},
		  };
};

export const getUser = async (userId?: number, userEmail?: string) => {
	const user = await prismaService.user.findUnique({
		where: {
			id: userId,
			email: userEmail,
		},
	});

	return user;
};

export const createUser = async (data: CreateUserInput) => {
	const existingUser = await getUser(undefined, data.email);

	if (existingUser) {
		return {
			success: false,
			message: "User already exist!",
		};
	}

	try {
		const createUser = await prismaService.user.create({
			data,
		});
		if (createUser) {
			return {
				success: true,
				message: "User created successfully",
			};
		}
	} catch (error) {
		return {
			success: false,
			message: error,
		};
	}
};

export const updateUser = async (userId: number, data: UpdateUserInput) => {
	const existingUser = await getUser(userId);

	if (!existingUser) {
		return {
			success: false,
			message: "No user found!",
		};
	}

	try {
		const updateUser = await prismaService.user.update({
			where: {
				id: userId,
			},
			data: {
				...data,
			},
		});

		if (updateUser) {
			return {
				success: true,
				message: "User successfully updated.",
			};
		}
	} catch (error) {
		return {
			success: false,
			message: error,
		};
	}
};

export const deleteUser = async (userId: number) => {
	const existingUser = await getUser(userId);

	if (!existingUser) {
		return {
			success: false,
			message: "No user found!",
		};
	}

	try {
		const deleteUser = await prismaService.user.delete({
			where: {
				id: userId,
			},
		});

		if (deleteUser) {
			return {
				success: true,
				message: "User has been deleted successfully.",
			};
		}
	} catch (error) {
		return {
			success: false,
			message: error,
		};
	}
};
