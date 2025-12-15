const {
  create,
  getAll,
  getOne,
  update,
  remove,
} = require("../../src/services/customer");

const { prisma } = require("../../src/prisma");

jest.mock("../../src/prisma", () => ({
  prisma: {
    customer: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

describe("Customer Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("create() → creates customer", async () => {
    const data = { name: "Sunshine" };

    prisma.customer.create.mockResolvedValue(data);

    const result = await create(data);

    expect(prisma.customer.create).toHaveBeenCalledWith({ data });
    expect(result).toEqual(data);
  });

  test("getAll() → returns all customers", async () => {
    const list = [{ id: 1 }, { id: 2 }];

    prisma.customer.findMany.mockResolvedValue(list);

    const result = await getAll();

    expect(prisma.customer.findMany).toHaveBeenCalled();
    expect(result).toEqual(list);
  });

  test("getOne() → returns single customer", async () => {
    const customer = { id: 1 };

    prisma.customer.findUnique.mockResolvedValue(customer);

    const result = await getOne(1);

    expect(prisma.customer.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(result).toEqual(customer);
  });

  test("update() → updates customer", async () => {
    const updated = { id: 1, name: "Updated Name" };

    prisma.customer.update.mockResolvedValue(updated);

    const result = await update(1, updated);

    expect(prisma.customer.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: updated,
    });
    expect(result).toEqual(updated);
  });

  test("remove() → deletes customer", async () => {
    const deleted = { id: 1 };

    prisma.customer.delete.mockResolvedValue(deleted);

    const result = await remove(1);

    expect(prisma.customer.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(result).toEqual(deleted);
  });
});
