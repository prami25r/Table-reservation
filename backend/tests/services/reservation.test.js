const {
  create,
  getAll,
  getOne,
  update,
  remove,
  updateStatus,
  getUpcoming,
  getCheckedIn,
  getCancelled,
} = require("../../src/services/reservation");

const { prisma } = require("../../src/prisma");

jest.mock("../../src/prisma", () => ({
  prisma: {
    table: {
      findMany: jest.fn(),
    },
    reservationTable: {
      findMany: jest.fn(),
    },
    customer: {
      create: jest.fn(),
    },
    reservation: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

describe("Reservation Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("create() → creates reservation when table is available", async () => {
    prisma.table.findMany.mockResolvedValue([
      { id: 1 },
      { id: 2 },
    ]);

    prisma.reservationTable.findMany.mockResolvedValue([
      { tableId: 2 },
    ]);

    prisma.customer.create.mockResolvedValue({ id: 10 });

    const reservationResult = { id: 100 };
    prisma.reservation.create.mockResolvedValue(reservationResult);

    const input = {
      fullName: "Sunshine",
      mobileNumber: "9999999999",
      email: "sun@example.com",
      restaurantId: 1,
      reservationDate: new Date(),
      guestCount: 2,
      specialRequests: "Window seat",
    };

    const result = await create(input);

    expect(prisma.table.findMany).toHaveBeenCalled();
    expect(prisma.reservationTable.findMany).toHaveBeenCalled();
    expect(prisma.customer.create).toHaveBeenCalled();
    expect(prisma.reservation.create).toHaveBeenCalled();
    expect(result).toEqual(reservationResult);
  });

  test("create() → throws error when NO tables available", async () => {
    prisma.table.findMany.mockResolvedValue([
      { id: 1 },
    ]);

    prisma.reservationTable.findMany.mockResolvedValue([
      { tableId: 1 },
    ]);

    const input = {
      fullName: "Sunshine",
      mobileNumber: "9999999999",
      restaurantId: 1,
      reservationDate: new Date(),
      guestCount: 2,
    };

    await expect(create(input))
      .rejects
      .toThrow("No tables available for this restaurant");
  });

  test("getAll() → returns reservations", async () => {
    const list = [{ id: 1 }];
    prisma.reservation.findMany.mockResolvedValue(list);

    const result = await getAll();

    expect(prisma.reservation.findMany).toHaveBeenCalled();
    expect(result).toEqual(list);
  });

  test("getOne() → returns reservation", async () => {
    const data = { id: 1 };
    prisma.reservation.findUnique.mockResolvedValue(data);

    const result = await getOne(1);

    expect(prisma.reservation.findUnique).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: 1 } })
    );
    expect(result).toEqual(data);
  });

  test("update() → updates reservation", async () => {
    const updated = { id: 1, status: "Checked-In" };
    prisma.reservation.update.mockResolvedValue(updated);

    const result = await update(1, {
      status: "Checked-In",
      guestCount: 4,
    });

    expect(prisma.reservation.update).toHaveBeenCalled();
    expect(result).toEqual(updated);
  });

  test("remove() → deletes reservation", async () => {
    const deleted = { id: 1 };
    prisma.reservation.delete.mockResolvedValue(deleted);

    const result = await remove(1);

    expect(prisma.reservation.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(result).toEqual(deleted);
  });

  test("updateStatus() → updates status only", async () => {
    const updated = { id: 1, status: "Cancelled" };
    prisma.reservation.update.mockResolvedValue(updated);

    const result = await updateStatus(1, "Cancelled");

    expect(prisma.reservation.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { status: "Cancelled" },
    });
    expect(result).toEqual(updated);
  });

  test("getUpcoming() → returns upcoming reservations", async () => {
    const list = [{ id: 1 }];
    prisma.reservation.findMany.mockResolvedValue(list);

    const result = await getUpcoming();

    expect(result).toEqual(list);
  });

  test("getCheckedIn() → returns checked-in reservations", async () => {
    const list = [{ id: 2 }];
    prisma.reservation.findMany.mockResolvedValue(list);

    const result = await getCheckedIn();

    expect(result).toEqual(list);
  });

  test("getCancelled() → returns cancelled reservations", async () => {
    const list = [{ id: 3 }];
    prisma.reservation.findMany.mockResolvedValue(list);

    const result = await getCancelled();

    expect(result).toEqual(list);
  });
});
