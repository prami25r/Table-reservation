export const mockRestaurant = (overrides = {}) => ({
  id: 5,
  name: "Pizza Hub",
  location: "Test City",
  ...overrides,
});

export const mockReservation = (overrides = {}) => ({
  id: 1,
  restaurantId: 10,
  
  restaurant: mockRestaurant({ id: 10 }),

  guestCount: 4,
  reservationDate: "2025-01-01T12:00:00Z",
  status: "Upcoming",

  ...overrides,
});
