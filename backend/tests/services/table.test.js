const {
  create,
  getAll,
  getOne,
  update,
  remove,
} = require("../../src/services/table");

const { prisma } = require("../../src/prisma");

jest.mock("../../src/prisma", () => ({
  prisma: {
    table: {
      count: jest.fn(),
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

describe("Table Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("create() → creates table when count < 10", async () => {
    const data = { restaurantId: 1, name: "T1" };

    prisma.table.count.mockResolvedValue(5);
    prisma.table.create.mockResolvedValue(data);

    const result = await create(data);

    expect(prisma.table.count).toHaveBeenCalledWith({
      where: { restaurantId: 1 },
    });
    expect(prisma.table.create).toHaveBeenCalledWith({ data });
    expect(result).toEqual(data);
  });

  test("create() → throws error when count >= 10", async () => {
    const data = { restaurantId: 1, name: "T11" };

    prisma.table.count.mockResolvedValue(10);

    await expect(create(data)).rejects.toThrow(
      "Only 10 tables allowed per restaurant"
    );

    expect(prisma.table.create).not.toHaveBeenCalled();
  });

  test("getAll() → returns tables with restaurant", async () => {
    const list = [{ id: 1 }];

    prisma.table.findMany.mockResolvedValue(list);

    const result = await getAll();

    expect(prisma.table.findMany).toHaveBeenCalledWith({
      include: { restaurant: true },
    });
    expect(result).toEqual(list);
  });

  test("getOne() → returns single table", async () => {
    const table = { id: 1 };

    prisma.table.findUnique.mockResolvedValue(table);

    const result = await getOne(1);

    expect(prisma.table.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: { restaurant: true },
    });
    expect(result).toEqual(table);
  });

  test("update() → updates table", async () => {
    const updated = { id: 1, name: "Updated" };

    prisma.table.update.mockResolvedValue(updated);

    const result = await update(1, updated);

    expect(prisma.table.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: updated,
    });
    expect(result).toEqual(updated);
  });

  test("remove() → deletes table", async () => {
    const deleted = { id: 1 };

    prisma.table.delete.mockResolvedValue(deleted);

    const result = await remove(1);

    expect(prisma.table.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(result).toEqual(deleted);
  });
});
