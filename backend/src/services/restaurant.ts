import { prisma } from "../prisma";

export const create = (data: any) =>
  prisma.restaurant.create({ data });

export const getAll = () =>
  prisma.restaurant.findMany({
    include: { tables: true }
  });

export const getOne = (id: number) =>
  prisma.restaurant.findUnique({
    where: { id },
    include: { tables: true }
  });

export const update = (id: number, data: any) =>
  prisma.restaurant.update({ where: { id }, data });

export const remove = (id: number) =>
  prisma.restaurant.delete({ where: { id } });
