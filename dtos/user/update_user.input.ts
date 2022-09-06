import { UserRole } from "@prisma/client";
import { CreateUserInput } from "./create_user.input";

export interface UpdateUserInput extends Partial<CreateUserInput> {}
