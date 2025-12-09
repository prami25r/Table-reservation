import {
  create,
  getAll,
  getOne,
  update,
  remove
} from "../../src/services/table";

import { prisma } from "../../src/prisma";

jest.mock("../../src/prisma", () => ({
  prisma: {
    table: {
      count: jest.fn(),
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    }
  }
}));

describe("Table Service", () => {
  beforeEach(() => jest.clearAllMocks());

  test("create() throws error when table count >= 10", async () => {
    prisma.table.count.mockResolvedValue(10);

    await expect(create({ restaurantId: 1 }))
      .rejects.toThrow("Only 10 tables allowed per restaurant");
  });

  test("create() creates table when count < 10", async () => {
    prisma.table.count.mockResolvedValue(5);
    const mockTable = { id: 1 };
    prisma.table.create.mockResolvedValue(mockTable);

    const result = await create({ restaurantId: 1 });

    expect(prisma.table.create).toHaveBeenCalled();
    expect(result).toEqual(mockTable);
  });

  test("getAll()", async () => {
    const list = [{ id: 1 }];
    prisma.table.findMany.mockResolvedValue(list);

    const result = await getAll();

    expect(result).toEqual(list);
  });

  test("getOne()", async () => {
    const data = { id: 2 };
    prisma.table.findUnique.mockResolvedValue(data);

    const result = await getOne(2);

    expect(prisma.table.findUnique).toHaveBeenCalledWith({
      where: { id: 2 },
      include: { restaurant: true }
    });
    expect(result).toEqual(data);
  });

  test("update()", async () => {
    const updated = { id: 3 };
    prisma.table.update.mockResolvedValue(updated);

    const result = await update(3, updated);

    expect(prisma.table.update).toHaveBeenCalledWith({
      where: { id: 3 },
      data: updated
    });
    expect(result).toEqual(updated);
  });

  test("remove()", async () => {
    const deleted = { id: 4 };
    prisma.table.delete.mockResolvedValue(deleted);

    const result = await remove(4);

    expect(prisma.table.delete).toHaveBeenCalledWith({
      where: { id: 4 }
    });
    expect(result).toEqual(deleted);
  });
});
