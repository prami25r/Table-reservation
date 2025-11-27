import { Request, Response } from "express";
import * as ReservationService from "../services/reservation";

export const createReservation = async (req: Request, res: Response) => {
  try {
    const {
      customerId,
      restaurantId,
      reservationDate,
      guestCount,
      specialRequests,
      tableIds,
      tables
    } = req.body;

    if (!customerId || !restaurantId || !reservationDate || !guestCount) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const finalTableIds =
      Array.isArray(tableIds)
        ? tableIds
        : Array.isArray(tables)
        ? tables
        : [];

    const result = await ReservationService.create({
      customerId: Number(customerId),
      restaurantId: Number(restaurantId),
      reservationDate,
      guestCount: Number(guestCount),
      specialRequests: specialRequests || null,
      tableIds: finalTableIds.map(Number)
    });

    return res.status(201).json(result);

  } catch (error) {
    console.error("Create reservation error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const getReservations = async (req: Request, res: Response) => {
  const data = await ReservationService.getAll();
  return res.json(data);
};

export const getReservation = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const data = await ReservationService.getOne(id);
  return res.json(data);
};

export const updateReservation = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await ReservationService.update(id, req.body);
  return res.json(result);
};

export const deleteReservation = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await ReservationService.remove(id);
  return res.json({ message: "Deleted" });
};

export const checkedInReservation = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updated = await ReservationService.updateStatus(id, "Checked-In");
  return res.json(updated);
};

export const cancelledReservation = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updated = await ReservationService.updateStatus(id, "Cancelled");
  return res.json(updated);
};
