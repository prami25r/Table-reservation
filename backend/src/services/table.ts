import { prisma } from "../prisma";

export const create = (data: any) =>
  prisma.table.create({ data });

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
