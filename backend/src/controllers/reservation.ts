import { Request, Response } from "express";
import { logger } from "../utils/logger";
import * as ReservationService from "../services/reservation";
import { z } from "zod";
import {
  createReservationSchema,
  updateReservationSchema
} from "../validations/reservation";

type CreateReservationInput = z.infer<typeof createReservationSchema>["body"];
type UpdateReservationInput = z.infer<typeof updateReservationSchema>["body"];

export const createReservation = async (req: Request, res: Response) => {
  try {
    logger.info("Creating reservation");
    const body = req.body as CreateReservationInput;

    const result = await ReservationService.create({
      fullName: body.fullName,
      mobileNumber: body.mobileNumber,
      email: body.email || null,
      restaurantId: Number(body.restaurantId),
      reservationDate: new Date(body.reservationDate),
      guestCount: Number(body.guestCount),
      specialRequests: body.specialRequests || null
    });

    return res.status(201).json(result);
  } catch (error: any) {
    logger.error(error.message);
    return res.status(500).json({ error: error.message || "Server error" });
  }
};

export const getReservations = async (_req: Request, res: Response) => {
  logger.info("Fetching all reservations");
  const data = await ReservationService.getAll();
  return res.json(data);
};

export const getReservation = async (req: Request, res: Response) => {
  logger.info(`Fetching reservation ${req.params.id}`);
  const id = Number(req.params.id);
  const data = await ReservationService.getOne(id);
  return res.json(data);
};

export const updateReservation = async (req: Request, res: Response) => {
  logger.info(`Updating reservation ${req.params.id}`);
  const id = Number(req.params.id);
  const body = req.body as UpdateReservationInput;

  const payload = {
    ...body,
    reservationDate: body.reservationDate ? new Date(body.reservationDate) : undefined
  };

  const result = await ReservationService.update(id, payload);
  return res.json(result);
};

export const deleteReservation = async (req: Request, res: Response) => {
  logger.info(`Deleting reservation ${req.params.id}`);
  const id = Number(req.params.id);
  await ReservationService.remove(id);
  return res.json({ message: "Deleted" });
};

export const checkedInReservation = async (req: Request, res: Response) => {
  logger.info(`Marking reservation ${req.params.id} as Checked-In`);
  const id = Number(req.params.id);
  const updated = await ReservationService.updateStatus(id, "Checked-In");
  return res.json(updated);
};

export const cancelledReservation = async (req: Request, res: Response) => {
  logger.info(`Cancelling reservation ${req.params.id}`);
  const id = Number(req.params.id);
  const updated = await ReservationService.updateStatus(id, "Cancelled");
  return res.json(updated);
};

export const getUpcomingReservations = async (_req, res) => {
  logger.info("Fetching upcoming reservations");
  const data = await ReservationService.getUpcoming();
  return res.json(data);
};

export const getCheckedInReservations = async (_req, res) => {
  logger.info("Fetching checked-in reservations");
  const data = await ReservationService.getCheckedIn();
  return res.json(data);
};

export const getCancelledReservations = async (_req, res) => {
  logger.info("Fetching cancelled reservations");
  const data = await ReservationService.getCancelled();
  return res.json(data);
};
