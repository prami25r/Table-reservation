import { prisma } from "../prisma";

export const create = async (data: any) => {
  const count = await prisma.table.count({
    where: { restaurantId: data.restaurantId }
  });

  if (count >= 10) {
    throw new Error("Only 10 tables allowed per restaurant");
  }

  return prisma.table.create({ data });
};

export const getAll = () =>
  prisma.table.findMany({
    include: { restaurant: true }
  });

export const getOne = (id: number) =>
  prisma.table.findUnique({
    where: { id },
    include: { restaurant: true }
  });

export const update = (id: number, data: any) =>
  prisma.table.update({ where: { id }, data });

export const remove = (id: number) =>
  prisma.table.delete({ where: { id } });
