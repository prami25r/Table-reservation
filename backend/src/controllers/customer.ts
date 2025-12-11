import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";
import * as service from "../services/customer";
import { z } from "zod";
import { createCustomerSchema, updateCustomerSchema } from "../validations/customer";

type CreateCustomerInput = z.infer<typeof createCustomerSchema>["body"];
type UpdateCustomerInput = z.infer<typeof updateCustomerSchema>["body"];

const notFound = (msg: string) => {
  const err: any = new Error(msg);
  err.status = 404;
  return err;
};

export const createCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info("Creating customer");
    const body = req.body as CreateCustomerInput;
    const customer = await service.create(body);
    res.json(customer);
  } catch (err) {
    next(err);
  }
};

export const getCustomers = async (_: Request, res: Response, next: NextFunction) => {
  try {
    logger.info("Fetching all customers");
    res.json(await service.getAll());
  } catch (err) {
    next(err);
  }
};

export const getCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info(`Fetching customer ${req.params.id}`);
    const id = Number(req.params.id);
    const customer = await service.getOne(id);
    if (!customer) throw notFound("Customer not found");
    res.json(customer);
  } catch (err) {
    next(err);
  }
};

export const updateCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info(`Updating customer ${req.params.id}`);
    const id = Number(req.params.id);
    const body = req.body as UpdateCustomerInput;
    const updated = await service.update(id, body);
    if (!updated) throw notFound("Cannot update: Customer not found");
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info(`Deleting customer ${req.params.id}`);
    const id = Number(req.params.id);
    const deleted = await service.remove(id);
    if (!deleted) throw notFound("Cannot delete: Customer not found");
    res.json({ message: "Customer deleted successfully", deleted });
  } catch (err) {
    next(err);
  }
};
