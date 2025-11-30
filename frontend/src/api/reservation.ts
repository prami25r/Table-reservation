import api from "./axiosInstance";

export const getReservations = () => api.get("/reservations");

export const createReservation = (data: any) =>
  api.post("/reservations", data);

export const updateReservation = (id: number, data: any) =>
  api.put(`/reservations/${id}`, data);

export const updateStatus = (id: number, status: string) => {
  const mapped: any = {
    "Checked-In": "checkedin",
    "Cancelled" : "cancel",
  };

  return api.patch(`/reservations/${id}/${mapped[status]}`);
};

export const getRestaurants = () => api.get("/restaurants");

export const getCustomers = () => api.get("/customers");
