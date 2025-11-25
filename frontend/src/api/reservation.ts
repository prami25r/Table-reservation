import api from './axiosInstance';

export const getReservations = () => api.get('/reservations');
export const getReservation = (id: number) => api.get(`/reservations/${id}`);

export const createReservation = (data: {
  customerId: number;
  restaurantId: number;
  reservationDate: string;
  guestCount: number;
  specialRequests?: string;
  tableIds?: number[];
}) => api.post('/reservations', data);


export const updateReservation = (id: number, data: any) =>
  api.put(`/reservations/${id}`, data);


export const checkInReservation = (id: number) =>
  api.patch(`/reservations/${id}/checkedin`);

export const cancelReservation = (id: number) =>
  api.patch(`/reservations/${id}/cancel`);
