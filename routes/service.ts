import {
	createService,
	deleteService,
	getAllServices,
	updateService,
} from "@controllers/service.controller";
import { Router } from "express";

const serviceRouter = Router();

serviceRouter.get("/", getAllServices);
serviceRouter.post("/", createService);
serviceRouter.patch("/:id", updateService);
serviceRouter.delete("/:id", deleteService);

export default serviceRouter;
