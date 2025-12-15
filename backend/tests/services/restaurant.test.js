const {
  create,
  getAll,
  getOne,
  update,
  remove,
} = require("../../src/services/restaurant");

const { prisma } = require("../../src/prisma");

jest.mock("../../src/prisma", () => ({
  prisma: {
    restaurant: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

describe("Restaurant Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("create() → creates restaurant", async () => {
    const data = { name: "BBQ Nation" };

    prisma.restaurant.create.mockResolvedValue(data);

    const result = await create(data);

    expect(prisma.restaurant.create).toHaveBeenCalledWith({ data });
    expect(result).toEqual(data);
  });

  test("getAll() → returns all restaurants", async () => {
    const list = [{ id: 1 }, { id: 2 }];

    prisma.restaurant.findMany.mockResolvedValue(list);

    const result = await getAll();

    expect(prisma.restaurant.findMany).toHaveBeenCalled();
    expect(result).toEqual(list);
  });

  test("getOne() → returns single restaurant", async () => {
    const restaurant = { id: 1 };

    prisma.restaurant.findUnique.mockResolvedValue(restaurant);

    const result = await getOne(1);

    expect(prisma.restaurant.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(result).toEqual(restaurant);
  });

  test("update() → updates restaurant", async () => {
    const updated = { id: 1, name: "Updated Name" };

    prisma.restaurant.update.mockResolvedValue(updated);

    const result = await update(1, updated);

    expect(prisma.restaurant.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: updated,
    });
    expect(result).toEqual(updated);
  });

  test("remove() → deletes restaurant", async () => {
    const deleted = { id: 1 };

    prisma.restaurant.delete.mockResolvedValue(deleted);

    const result = await remove(1);

    expect(prisma.restaurant.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(result).toEqual(deleted);
  });
});
