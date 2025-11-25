import { prisma } from "../prisma";

export const create = async (data: any) => {
  return prisma.restaurant.create({
    data,
  });
};

export const getAll = async () => {
  return prisma.restaurant.findMany();
};

export const getOne = async (id: number) => {
  return prisma.restaurant.findUnique({
    where: { id },
  });
};

export const update = async (id: number, data: any) => {
  return prisma.restaurant.update({
    where: { id },
    data,
  });
};

export const remove = async (id: number) => {
  return prisma.restaurant.delete({
    where: { id },
  });
};
