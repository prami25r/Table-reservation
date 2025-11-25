import { Request, Response, NextFunction } from "express";
import * as service from "../services/reservation";

export const createReservation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await service.create(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const getReservations = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const result = await service.getAll();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const getReservation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await service.getOne(Number(req.params.id));

    if (!result) {
      const error = new Error("Reservation not found");
      (error as any).status = 404;
      throw error;
    }

    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const updateReservation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await service.update(Number(req.params.id), req.body);

    if (!result) {
      const error = new Error("Cannot update: Reservation not found");
      (error as any).status = 404;
      throw error;
    }

    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const deleteReservation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await service.remove(Number(req.params.id));

    if (!result) {
      const error = new Error("Cannot delete: Reservation not found");
      (error as any).status = 404;
      throw error;
    }

    res.json({ message: "Reservation deleted successfully", result });
  } catch (err) {
    next(err);
  }
};
