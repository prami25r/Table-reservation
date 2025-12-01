import { prisma } from "../prisma";

export const create = async (input: any) => {
  // Fetch all tables for this restaurant (your seeded 10)
  const allTables = await prisma.table.findMany({
    where: { restaurantId: input.restaurantId }
  });

  if (allTables.length < 10) {
    throw new Error("Restaurant tables not fully configured");
  }

  const usedTables = await prisma.reservationTable.findMany({
    where: {
      reservation: { restaurantId: input.restaurantId }
    },
    select: { tableId: true }
  });

  const availableTable = allTables.find(
    (t) => !usedTables.some((u) => u.tableId === t.id)
  );

  if (!availableTable) {
    throw new Error("No tables available for this restaurant");
  }


  const customer = await prisma.customer.create({
    data: {
      fullName: input.fullName,
      mobileNumber: input.mobileNumber,
      email: input.email
    }
  });
  return prisma.reservation.create({
    data: {
      customerId: customer.id,
      restaurantId: input.restaurantId,
      reservationDate: input.reservationDate,
      guestCount: input.guestCount,
      specialRequests: input.specialRequests,
      tables: {
        create: {
          tableId: availableTable.id
        }
      }
    },
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

export const updateStatus = (id: number, status: string) =>
  prisma.reservation.update({
    where: { id },
    data: { status }
  });
