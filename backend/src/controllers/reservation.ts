import { Request, Response, NextFunction } from "express";
import { prisma } from "../prisma";

const notFound = (msg: string) => {
  const err: any = new Error(msg);
  err.status = 404;
  return err;
};


export const createReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      fullName,
      mobileNumber,
      email,
      restaurantId,
      date,
      time,
      guestCount,
      specialRequests,
    } = req.body;

    if (!fullName || !mobileNumber || !restaurantId || !date || !time || !guestCount) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const reservationDate = new Date(`${date}T${time}:00`);

   
    let customer = await prisma.customer.findFirst({
      where: {
        OR: [{ mobileNumber }, { email }],
      },
    });

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          fullName,
          mobileNumber,
          email,
        },
      });
    } else {

      customer = await prisma.customer.update({
        where: { id: customer.id },
        data: {
          fullName,
          mobileNumber,
          email,
        },
      });
    }

    const reservation = await prisma.reservation.create({
      data: {
        customerId: customer.id,
        restaurantId: Number(restaurantId),
        reservationDate,
        guestCount: Number(guestCount),
        specialRequests,
        status: "Upcoming",
      },
      include: {
        customer: true,
        restaurant: true,
      },
    });

    res.json(reservation);
  } catch (err) {
    next(err);
  }
};


export const getReservations = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reservations = await prisma.reservation.findMany({
      include: {
        customer: true,
        restaurant: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(reservations);
  } catch (err) {
    next(err);
  }
};


export const getReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);

    const reservation = await prisma.reservation.findUnique({
      where: { id },
      include: {
        customer: true,
        restaurant: true,
      },
    });

    if (!reservation) throw notFound("Reservation not found");

    res.json(reservation);
  } catch (err) {
    next(err);
  }
};


export const updateReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);

    const {
      fullName,
      mobileNumber,
      email,
      restaurantId,
      date,
      time,
      guestCount,
      specialRequests,
    } = req.body;

    const existing = await prisma.reservation.findUnique({
      where: { id },
      include: { customer: true },
    });

    if (!existing) throw notFound("Reservation not found");


    await prisma.customer.update({
      where: { id: existing.customerId },
      data: {
        fullName,
        mobileNumber,
        email,
      },
    });

    const updated = await prisma.reservation.update({
      where: { id },
      data: {
        restaurantId: Number(restaurantId),
        reservationDate: new Date(`${date}T${time}:00`),
        guestCount: Number(guestCount),
        specialRequests,
      },
    });

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);

    await prisma.reservation.delete({
      where: { id },
    });

    res.json({ message: "Reservation deleted successfully" });
  } catch (err) {
    next(err);
  }
};


export const checkedInReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);

    const updated = await prisma.reservation.update({
      where: { id },
      data: { status: "Checked-In" },
    });

    res.json(updated);
  } catch (err) {
    next(err);
  }
};


export const cancelledReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);

    const updated = await prisma.reservation.update({
      where: { id },
      data: { status: "Cancelled" },
    });

    res.json(updated);
  } catch (err) {
    next(err);
  }
};
