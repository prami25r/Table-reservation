import {
  create,
  getAll,
  getOne,
  update,
  remove
} from "../../src/services/customer";

import { prisma } from "../../src/prisma";

jest.mock("../../src/prisma", () => ({
  prisma: {
    customer: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    }
  }
}));

describe("Customer Service", () => {
  test("create()", async () => {
    const mockData = { id: 1 };
    prisma.customer.create.mockResolvedValue(mockData);

    const result = await create(mockData);

    expect(prisma.customer.create).toHaveBeenCalledWith({ data: mockData });
    expect(result).toEqual(mockData);
  });

  test("getAll()", async () => {
    const list = [{ id: 1 }];
    prisma.customer.findMany.mockResolvedValue(list);

    const result = await getAll();

    expect(result).toEqual(list);
  });

  test("getOne()", async () => {
    const mockData = { id: 1 };
    prisma.customer.findUnique.mockResolvedValue(mockData);

    const result = await getOne(1);

    expect(prisma.customer.findUnique).toHaveBeenCalledWith({
      where: { id: 1 }
    });
    expect(result).toEqual(mockData);
  });

  test("update()", async () => {
    const updated = { id: 1, name: "Sunshine" };
    prisma.customer.update.mockResolvedValue(updated);

    const result = await update(1, updated);

    expect(prisma.customer.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: updated
    });
    expect(result).toEqual(updated);
  });

  test("remove()", async () => {
    const deleted = { id: 1 };
    prisma.customer.delete.mockResolvedValue(deleted);

    const result = await remove(1);

    expect(prisma.customer.delete).toHaveBeenCalledWith({
      where: { id: 1 }
    });
    expect(result).toEqual(deleted);
  });
});
