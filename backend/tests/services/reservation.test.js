import {
  create,
  getAll,
  getOne,
  update,
  remove,
  updateStatus,
  getUpcoming,
  getCheckedIn,
  getCancelled
} from "../../src/services/reservation";

import { prisma } from "../../src/prisma";

jest.mock("../../src/prisma", () => ({
  prisma: {
    table: { findMany: jest.fn() },
    reservationTable: { findMany: jest.fn() },
    customer: { create: jest.fn() },
    reservation: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    }
  }
}));

describe("Reservation Service", () => {
  beforeEach(() => jest.clearAllMocks());

  test("create() throws when no available table", async () => {
    prisma.table.findMany.mockResolvedValue([
      { id: 1 },
      { id: 2 }
    ]);

    prisma.reservationTable.findMany.mockResolvedValue([
      { tableId: 1 },
      { tableId: 2 }
    ]);

    await expect(
      create({ restaurantId: 1 })
    ).rejects.toThrow("No tables available for this restaurant");
  });

  test("create() returns new reservation", async () => {
    prisma.table.findMany.mockResolvedValue(
      Array.from({ length: 10 }, (_, i) => ({ id: i + 1 }))
    );

    prisma.reservationTable.findMany.mockResolvedValue([
      { tableId: 1 },
      { tableId: 2 }
    ]);

    prisma.customer.create.mockResolvedValue({ id: 99 });

    const mockReservation = { id: 777 };
    prisma.reservation.create.mockResolvedValue(mockReservation);

    const input = {
      fullName: "Sunshine",
      mobileNumber: "123",
      email: "mail@mail.com",
      restaurantId: 1,
      reservationDate: new Date(),
      guestCount: 2,
      specialRequests: "None"
    };

    const result = await create(input);

    expect(prisma.customer.create).toHaveBeenCalled();
    expect(prisma.reservation.create).toHaveBeenCalled();
    expect(result).toEqual(mockReservation);
  });

  test("getAll()", async () => {
    const list = [{ id: 1 }];
    prisma.reservation.findMany.mockResolvedValue(list);

    const result = await getAll();

    expect(result).toEqual(list);
  });

  test("getOne()", async () => {
    const data = { id: 2 };
    prisma.reservation.findUnique.mockResolvedValue(data);

    const result = await getOne(2);

    expect(result).toEqual(data);
  });

  test("update()", async () => {
    const updated = { id: 5, guestCount: 4 };
    prisma.reservation.update.mockResolvedValue(updated);

    const result = await update(5, { guestCount: 4 });

    expect(result).toEqual(updated);
  });

  test("remove()", async () => {
    const deleted = { id: 9 };
    prisma.reservation.delete.mockResolvedValue(deleted);

    const result = await remove(9);

    expect(result).toEqual(deleted);
  });

  test("updateStatus()", async () => {
    const updated = { id: 1, status: "Checked-In" };
    prisma.reservation.update.mockResolvedValue(updated);

    const result = await updateStatus(1, "Checked-In");

    expect(result).toEqual(updated);
  });

  test("getUpcoming()", async () => {
    const list = [{ id: 1 }];
    prisma.reservation.findMany.mockResolvedValue(list);

    const result = await getUpcoming();

    expect(result).toEqual(list);
  });

  test("getCheckedIn()", async () => {
    const list = [{ id: 2 }];
    prisma.reservation.findMany.mockResolvedValue(list);

    const result = await getCheckedIn();

    expect(result).toEqual(list);
  });

  test("getCancelled()", async () => {
    const list = [{ id: 3 }];
    prisma.reservation.findMany.mockResolvedValue(list);

    const result = await getCancelled();

    expect(result).toEqual(list);
  });
});
