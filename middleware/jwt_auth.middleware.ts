import { getUser } from "@repositories/user.repository";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export const JWTAuthMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const authHeader = req.headers.authorization;

	if (authHeader) {
		const token = authHeader.split(" ")[1];

		jwt.verify(
			token,
			process.env.JWT_SECRET!.toString(),
			async (err, token) => {
				if (err) {
					return res.status(403).json({
						success: false,
						message: "Unauthorized!",
					});
				}

				const t = token as jwt.JwtPayload;
				const user = await getUser(t.userId);

				if (user) {
					req.user = user;
				}

				next();
			}
		);
	} else {
		res.status(401).json({
			success: false,
			message: "Unauthorized!",
		});
	}
};
