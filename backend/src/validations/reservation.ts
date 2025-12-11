import { z } from "zod";

export const createReservationSchema = z.object({
  body: z.object({
    customerId: z.number(),
    tableId: z.number(),
    date: z.string(),
    time: z.string(),
    guests: z.number().min(1),
  }),
});

export const updateReservationSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z.object({
    tableId: z.number().optional(),
    date: z.string().optional(),
    time: z.string().optional(),
    guests: z.number().optional(),
  }),
});

export const idParamSchema = z.object({
  params: z.object({ id: z.string() }),
});
