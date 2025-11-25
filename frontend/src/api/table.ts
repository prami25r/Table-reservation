import api from './axiosInstance';

export const getTablesByRestaurant = (restaurantId: number) =>
  api.get(`/restaurants/${restaurantId}/tables`);

export const getTable = (id: number) => api.get(`/tables/${id}`);
