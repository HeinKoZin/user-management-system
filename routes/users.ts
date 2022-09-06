import {
	createUser,
	deleteUser,
	getAllUsers,
	updateUser,
} from "@controllers/user.controller";

import bodyParser from "body-parser";
import { Router } from "express";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.post("/", createUser);
userRouter.patch("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;
