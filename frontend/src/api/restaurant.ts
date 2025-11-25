import api from './axiosInstance';

export const getRestaurants = () => api.get('/restaurants');
export const getRestaurant = (id: number) => api.get(`/restaurants/${id}`);
