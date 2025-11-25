import { Request, Response, NextFunction } from "express";
import * as service from "../services/table";

const notFound = (msg: string) => {
  const err: any = new Error(msg);
  err.status = 404;
  return err;
};

export const createTable = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const table = await service.create(req.body);
    res.json(table);
  } catch (err) {
    next(err);
  }
};

export const getTables = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const tables = await service.getAll();
    res.json(tables);
  } catch (err) {
    next(err);
  }
};

export const getTable = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const table = await service.getOne(id);
    if (!table) throw notFound("Table not found");
    res.json(table);
  } catch (err) {
    next(err);
  }
};

export const updateTable = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const updated = await service.update(id, req.body);
    if (!updated) throw notFound("Cannot update: Table not found");
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteTable = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const deleted = await service.remove(id);
    if (!deleted) throw notFound("Cannot delete: Table not found");
    res.json({ message: "Table deleted successfully", deleted });
  } catch (err) {
    next(err);
  }
};
