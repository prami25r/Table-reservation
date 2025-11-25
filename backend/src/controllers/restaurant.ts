import { Request, Response, NextFunction } from "express";
import * as service from "../services/restaurant";

export const createRestaurant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await service.create(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const getRestaurants = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const result = await service.getAll();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const getRestaurant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const result = await service.getOne(id);

    if (!result) {
      const error: any = new Error("Restaurant not found");
      error.status = 404;
      throw error;
    }

    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const updateRestaurant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const result = await service.update(id, req.body);

    if (!result) {
      const error: any = new Error("Cannot update: Restaurant not found");
      error.status = 404;
      throw error;
    }

    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const deleteRestaurant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const result = await service.remove(id);

    if (!result) {
      const error: any = new Error("Cannot delete: Restaurant not found");
      error.status = 404;
      throw error;
    }

    res.json({ message: "Restaurant deleted successfully", result });
  } catch (err) {
    next(err);
  }
};

