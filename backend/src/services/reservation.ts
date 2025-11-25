import { prisma } from "../prisma";

export const create = async (input: any) => {
  const data: any = {
    customerId: input.customerId,
    restaurantId: input.restaurantId,
    reservationDate: new Date(input.reservationDate),
    guestCount: input.guestCount,
    specialRequests: input.specialRequests,
  };

  if (Array.isArray(input.tableIds) && input.tableIds.length > 0) {
    data.tables = {
      create: input.tableIds.map((tableId: number) => ({ tableId }))
    };
  }

  return prisma.reservation.create({
    data,
    include: {
      customer: true,
      restaurant: true,
      tables: { include: { table: true } }
    }
  });
};

export const getAll = () =>
  prisma.reservation.findMany({
    include: {
      customer: true,
      restaurant: true,
      tables: { include: { table: true } }
    },
    orderBy: { reservationDate: "asc" }
  });

export const getOne = (id: number) =>
  prisma.reservation.findUnique({
    where: { id },
    include: {
      customer: true,
      restaurant: true,
      tables: { include: { table: true } }
    }
  });

export const update = (id: number, input: any) =>
  prisma.reservation.update({
    where: { id },
    data: {
      reservationDate: input.reservationDate
        ? new Date(input.reservationDate)
        : undefined,
      guestCount: input.guestCount,
      specialRequests: input.specialRequests,
      status: input.status
    }
  });

export const remove = (id: number) =>
  prisma.reservation.delete({ where: { id } });

