import { z } from "zod";

export const createTableSchema = z.object({
  body: z.object({
    number: z.number(),
    seats: z.number().min(1),
    restaurantId: z.number(),
  }),
});

export const updateTableSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z.object({
    number: z.number().optional(),
    seats: z.number().optional(),
    restaurantId: z.number().optional(),
  }),
});

export const idParamSchema = z.object({
  params: z.object({ id: z.string() }),
});
