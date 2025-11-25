import { prisma } from "../prisma";

export const create = (data: any) =>
  prisma.customer.create({ data });

export const getAll = () =>
  prisma.customer.findMany();

export const getOne = (id: number) =>
  prisma.customer.findUnique({ where: { id } });

export const update = (id: number, data: any) =>
  prisma.customer.update({ where: { id }, data });

export const remove = (id: number) =>
  prisma.customer.delete({ where: { id } });
