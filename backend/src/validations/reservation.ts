import { z } from "zod";

export const createReservationSchema = z.object({
  body: z.object({
    fullName: z.string(),
    mobileNumber: z.string(),
    email: z.string().email().optional(),
    restaurantId: z.number(),
    reservationDate: z.string(),
    guestCount: z.number(),
    specialRequests: z.string().optional(),
  }),
});

export const updateReservationSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    fullName: z.string().optional(),
    mobileNumber: z.string().optional(),
    email: z.string().email().optional(),
    restaurantId: z.number().optional(),
    reservationDate: z.string().optional(),
    guestCount: z.number().optional(),
    specialRequests: z.string().optional(),
  }),
});

export const idParamSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});
