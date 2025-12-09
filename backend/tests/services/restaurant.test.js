import {
  create,
  getAll,
  getOne,
  update,
  remove
} from "../../src/services/restaurant";

import { prisma } from "../../src/prisma";

jest.mock("../../src/prisma", () => ({
  prisma: {
    restaurant: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    }
  }
}));

describe("Restaurant Service", () => {
  beforeEach(() => jest.clearAllMocks());

  test("create()", async () => {
    const mockData = { id: 1 };
    prisma.restaurant.create.mockResolvedValue(mockData);

    const result = await create(mockData);

    expect(prisma.restaurant.create).toHaveBeenCalledWith({ data: mockData });
    expect(result).toEqual(mockData);
  });

  test("getAll()", async () => {
    const list = [{ id: 2 }];
    prisma.restaurant.findMany.mockResolvedValue(list);

    const result = await getAll();

    expect(result).toEqual(list);
  });

  test("getOne()", async () => {
    const item = { id: 3 };
    prisma.restaurant.findUnique.mockResolvedValue(item);

    const result = await getOne(3);

    expect(prisma.restaurant.findUnique).toHaveBeenCalledWith({
      where: { id: 3 }
    });
    expect(result).toEqual(item);
  });

  test("update()", async () => {
    const updated = { id: 4, name: "Updated" };
    prisma.restaurant.update.mockResolvedValue(updated);

    const result = await update(4, updated);

    expect(prisma.restaurant.update).toHaveBeenCalledWith({
      where: { id: 4 },
      data: updated
    });
    expect(result).toEqual(updated);
  });

  test("remove()", async () => {
    const deleted = { id: 5 };
    prisma.restaurant.delete.mockResolvedValue(deleted);

    const result = await remove(5);

    expect(prisma.restaurant.delete).toHaveBeenCalledWith({
      where: { id: 5 }
    });
    expect(result).toEqual(deleted);
  });
});
