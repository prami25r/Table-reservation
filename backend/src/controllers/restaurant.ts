import { Request, Response, NextFunction } from "express";
import * as service from "../services/restaurant";

const notFound = (msg: string) => {
  const err: any = new Error(msg);
  err.status = 404;
  return err;
};

export const createRestaurant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const restaurant = await service.create(req.body);
    res.json(restaurant);
  } catch (err) {
    next(err);
  }
};

export const getRestaurants = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const restaurants = await service.getAll();
    res.json(restaurants);
  } catch (err) {
    next(err);
  }
};

export const getRestaurant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const restaurant = await service.getOne(id);
    if (!restaurant) throw notFound("Restaurant not found");
    res.json(restaurant);
  } catch (err) {
    next(err);
  }
};

export const updateRestaurant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const updated = await service.update(id, req.body);
    if (!updated) throw notFound("Cannot update: Restaurant not found");
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteRestaurant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const deleted = await service.remove(id);
    if (!deleted) throw notFound("Cannot delete: Restaurant not found");
    res.json({ message: "Restaurant deleted successfully", deleted });
  } catch (err) {
    next(err);
  }
};


