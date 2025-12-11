import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";
import * as service from "../services/table";
import { z } from "zod";
import {
  createTableSchema,
  updateTableSchema
} from "../validations/table";

type CreateTableInput = z.infer<typeof createTableSchema>["body"];
type UpdateTableInput = z.infer<typeof updateTableSchema>["body"];

const notFound = (msg: string) => {
  const err: any = new Error(msg);
  err.status = 404;
  return err;
};

export const createTable = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info("Creating table");
    const body = req.body as CreateTableInput;
    const table = await service.create(body);
    res.json(table);
  } catch (err) {
    next(err);
  }
};

export const getTables = async (_: Request, res: Response, next: NextFunction) => {
  try {
    logger.info("Fetching all tables");
    const tables = await service.getAll();
    res.json(tables);
  } catch (err) {
    next(err);
  }
};

export const getTable = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info(`Fetching table ${req.params.id}`);
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
    logger.info(`Updating table ${req.params.id}`);
    const id = Number(req.params.id);
    const body = req.body as UpdateTableInput;
    const updated = await service.update(id, body);
    if (!updated) throw notFound("Cannot update: Table not found");
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteTable = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info(`Deleting table ${req.params.id}`);
    const id = Number(req.params.id);
    const deleted = await service.remove(id);
    if (!deleted) throw notFound("Cannot delete: Table not found");
    res.json({ message: "Table deleted successfully", deleted });
  } catch (err) {
    next(err);
  }
};
