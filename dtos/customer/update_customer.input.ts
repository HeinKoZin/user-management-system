import { CreateCustomerInputInterface } from "./create_customer.input";

export interface UpdateCustomerInputInterface
	extends Partial<CreateCustomerInputInterface> {}
