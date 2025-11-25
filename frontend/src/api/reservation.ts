import api from './axiosInstance';

export const getReservations = () => api.get('/reservations');
export const getReservation = (id: number) => api.get(`/reservations/${id}`);

export const createReservation = (data: {
  customerId: number;
  restaurantId: number;
  reservationDate: string;
  guestCount: number;
  specialRequests?: string;
  tableIds: number[];
}) => api.post('/reservations', data);

export const updateReservationStatus = (
  id: number,
  status: 'Upcoming' | 'Checked-In' | 'Cancelled'
) => api.patch(`/reservations/${id}/status`, { status });
export const cancelReservation = (id: number) =>
  api.post(`/reservations/${id}/cancel`);   