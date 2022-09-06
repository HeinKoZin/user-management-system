import * as z from "zod"
import { CompleteBookingService, RelatedBookingServiceModel } from "./index"

export const ServiceModel = z.object({
  id: z.number().int(),
  name: z.string(),
  fee: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteService extends z.infer<typeof ServiceModel> {
  bookings: CompleteBookingService[]
}

/**
 * RelatedServiceModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedServiceModel: z.ZodSchema<CompleteService> = z.lazy(() => ServiceModel.extend({
  bookings: RelatedBookingServiceModel.array(),
}))
