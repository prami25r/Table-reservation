import { Request, Response, NextFunction } from "express";
import * as service from "../services/customer";

const notFound = (msg: string) => {
  const err: any = new Error(msg);
  err.status = 404;
  return err;
};

export const createCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customer = await service.create(req.body);
    res.json(customer);
  } catch (err) {
    next(err);
  }
};

export const getCustomers = async (_: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await service.getAll());
  } catch (err) {
    next(err);
  }
};

export const getCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
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
    const id = Number(req.params.id);
    const updated = await service.update(id, req.body);
    if (!updated) throw notFound("Cannot update: Customer not found");
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const deleted = await service.remove(id);
    if (!deleted) throw notFound("Cannot delete: Customer not found");
    res.json({ message: "Customer deleted successfully", deleted });
  } catch (err) {
    next(err);
  }
};
