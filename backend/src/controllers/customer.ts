import { Request, Response, NextFunction } from "express";
import * as service from "../services/customer";

export const createCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await service.create(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const getCustomers = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const result = await service.getAll();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const getCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await service.getOne(Number(req.params.id));

    if (!result) {
      const error = new Error("Customer not found");
      (error as any).status = 404;
      throw error;
    }

    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const updateCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await service.update(Number(req.params.id), req.body);

    if (!result) {
      const error = new Error("Cannot update: Customer not found");
      (error as any).status = 404;
      throw error;
    }

    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const deleteCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await service.remove(Number(req.params.id));

    if (!result) {
      const error = new Error("Cannot delete: Customer not found");
      (error as any).status = 404;
      throw error;
    }

    res.json({ message: "Customer deleted successfully", result });
  } catch (err) {
    next(err);
  }
};
