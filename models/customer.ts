import * as z from "zod"
import { CompleteBooking, RelatedBookingModel } from "./index"

export const CustomerModel = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  email: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export interface CompleteCustomer extends z.infer<typeof CustomerModel> {
  bookings: CompleteBooking[]
}

/**
 * RelatedCustomerModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCustomerModel: z.ZodSchema<CompleteCustomer> = z.lazy(() => CustomerModel.extend({
  bookings: RelatedBookingModel.array(),
}))
