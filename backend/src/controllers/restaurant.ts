import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";
import * as service from "../services/restaurant";
import { z } from "zod";
import {
  createRestaurantSchema,
  updateRestaurantSchema
} from "../validations/restaurant";

type CreateRestaurantInput = z.infer<typeof createRestaurantSchema>["body"];
type UpdateRestaurantInput = z.infer<typeof updateRestaurantSchema>["body"];

const notFound = (msg: string) => {
  const err: any = new Error(msg);
  err.status = 404;
  return err;
};

export const createRestaurant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info("Creating restaurant");
    const body = req.body as CreateRestaurantInput;
    const restaurant = await service.create(body);
    res.json(restaurant);
  } catch (err) {
    next(err);
  }
};

export const getRestaurants = async (_: Request, res: Response, next: NextFunction) => {
  try {
    logger.info("Fetching all restaurants");
    const restaurants = await service.getAll();
    res.json(restaurants);
  } catch (err) {
    next(err);
  }
};

export const getRestaurant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info(`Fetching restaurant ${req.params.id}`);
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
    logger.info(`Updating restaurant ${req.params.id}`);
    const id = Number(req.params.id);
    const body = req.body as UpdateRestaurantInput;
    const updated = await service.update(id, body);
    if (!updated) throw notFound("Cannot update: Restaurant not found");
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteRestaurant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info(`Deleting restaurant ${req.params.id}`);
    const id = Number(req.params.id);
    const deleted = await service.remove(id);
    if (!deleted) throw notFound("Cannot delete: Restaurant not found");
    res.json({ message: "Restaurant deleted successfully", deleted });
  } catch (err) {
    next(err);
  }
};
