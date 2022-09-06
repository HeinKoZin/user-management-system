import * as z from "zod"
import { CompleteBooking, RelatedBookingModel, CompleteService, RelatedServiceModel } from "./index"

export const BookingServiceModel = z.object({
  id: z.number().int(),
  bookingId: z.number().int(),
  serviceId: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteBookingService extends z.infer<typeof BookingServiceModel> {
  Booking: CompleteBooking
  Service: CompleteService
}

/**
 * RelatedBookingServiceModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedBookingServiceModel: z.ZodSchema<CompleteBookingService> = z.lazy(() => BookingServiceModel.extend({
  Booking: RelatedBookingModel,
  Service: RelatedServiceModel,
}))
