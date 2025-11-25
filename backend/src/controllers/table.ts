import { Request, Response, NextFunction } from "express";
import * as service from "../services/table";

export const createTable = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await service.create(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const getTables = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const result = await service.getAll();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const getTable = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const result = await service.getOne(id);

    if (!result) {
      const error: any = new Error("Table not found");
      error.status = 404;
      throw error;
    }

    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const updateTable = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const result = await service.update(id, req.body);

    if (!result) {
      const error: any = new Error("Cannot update: Table not found");
      error.status = 404;
      throw error;
    }

    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const deleteTable = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const result = await service.remove(id);

    if (!result) {
      const error: any = new Error("Cannot delete: Table not found");
      error.status = 404;
      throw error;
    }

    res.json({ message: "Table deleted successfully", result });
  } catch (err) {
    next(err);
  }
};
