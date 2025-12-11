import { z } from "zod";

export const createCustomerSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(10),
  }),
});

export const updateCustomerSchema = z.object({
  params: z.object({
    id: z.string().uuid().optional().or(z.string()),
  }),
  body: z.object({
    name: z.string().min(2).optional(),
    email: z.string().email().optional(),
    phone: z.string().min(10).optional(),
  }),
});

export const idParamSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});
