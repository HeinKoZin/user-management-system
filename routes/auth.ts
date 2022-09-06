import { accountLogin } from "@controllers/auth.controller";
import { createUser } from "@controllers/user.controller";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/login", accountLogin);
authRouter.post("/register", createUser);

export default authRouter;
