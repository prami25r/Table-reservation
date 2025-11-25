import api from './axiosInstance';

export const getCustomers = () => api.get('/customers');
export const getCustomer = (id: number) => api.get(`/customers/${id}`);

export const createCustomer = (data: {
  fullName: string;
  mobileNumber: string;
  email?: string;
}) => api.post('/customers', data);
