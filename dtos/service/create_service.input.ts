import { Service } from "@prisma/client";

export interface CreateServiceInput extends Pick<Service, "name" | "fee"> {}
