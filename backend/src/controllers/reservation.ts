import { Request, Response, NextFunction } from "express";
import * as service from "../services/reservation";

const notFound = (msg: string) => {
  const err: any = new Error(msg);
  err.status = 404;
  return err;
};

export const createReservation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reservation = await service.create(req.body);
    res.json(reservation);
  } catch (err) {
    next(err);
  }
};

export const getReservations = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const reservations = await service.getAll();
    res.json(reservations);
  } catch (err) {
    next(err);
  }
};

export const getReservation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const reservation = await service.getOne(id);
    if (!reservation) throw notFound("Reservation not found");
    res.json(reservation);
  } catch (err) {
    next(err);
  }
};

export const updateReservation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const updated = await service.update(id, req.body);
    if (!updated) throw notFound("Cannot update: Reservation not found");
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteReservation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const deleted = await service.remove(id);
    if (!deleted) throw notFound("Cannot delete: Reservation not found");
    res.json({ message: "Reservation deleted successfully", deleted });
  } catch (err) {
    next(err);
  }
};
