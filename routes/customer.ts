import {
	createCustomer,
	deleteCustomer,
	getAllCustomer,
	updateCustomer,
} from "@controllers/customer.controller";
import { Router } from "express";

const customerRouter = Router();

customerRouter.get("/", getAllCustomer);
customerRouter.post("/", createCustomer);
customerRouter.patch("/:id", updateCustomer);
customerRouter.delete("/:id", deleteCustomer);

export default customerRouter;
