// 1️⃣ MOCK axios create to reuse shared axios mock instance
jest.mock("axios", () => {
  const { mockAxiosInstance } = require("../../../mocks/axios");
  return {
    __esModule: true,
    default: { create: jest.fn(() => mockAxiosInstance) },
    create: jest.fn(() => mockAxiosInstance),
  };
});

import mockAxiosInstance from "../../../src/api/axiosInstance";

// 3️⃣ Import all API functions AFTER the mock is set
import {
  getCustomers,
  getCustomer,
  createCustomer,
} from "../../../src/api/customer";

import {
  getReservations,
  createReservation,
  updateReservation,
  updateStatus,
  getRestaurants,
} from "../../../src/api/reservation";

import {
  getRestaurants as getRestaurantsOnly,
  getRestaurant,
} from "../../../src/api/restaurant";

import {
  getTablesByRestaurant,
  getTable,
} from "../../../src/api/table";

describe("API Layer FULL COVERAGE", () => {
  const { get, post, put, patch } = mockAxiosInstance;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getCustomers → calls axios.get('/customers')", async () => {
    get.mockResolvedValue({ data: [] });

    await getCustomers();

    expect(get).toHaveBeenCalledWith("/customers");
  });

  test("getCustomer → calls axios.get('/customers/:id')", async () => {
    get.mockResolvedValue({ data: {} });

    await getCustomer(5);

    expect(get).toHaveBeenCalledWith("/customers/5");
  });

  test("createCustomer → calls axios.post('/customers')", async () => {
    const payload = { fullName: "Sunshine", mobileNumber: "99999" };
    post.mockResolvedValue({ data: {} });

    await createCustomer(payload);

    expect(post).toHaveBeenCalledWith("/customers", payload);
  });

  test("getReservations → calls axios.get('/reservations')", async () => {
    get.mockResolvedValue({ data: [] });

    await getReservations();

    expect(get).toHaveBeenCalledWith("/reservations");
  });

  test("createReservation → calls axios.post('/reservations')", async () => {
    const data = { fullName: "Test" };
    post.mockResolvedValue({ data: {} });

    await createReservation(data);

    expect(post).toHaveBeenCalledWith("/reservations", data);
  });

  test("updateReservation → calls axios.put('/reservations/:id')", async () => {
    const payload = { guestCount: 4 };
    put.mockResolvedValue({ data: {} });

    await updateReservation(2, payload);

    expect(put).toHaveBeenCalledWith("/reservations/2", payload);
  });

  test("updateStatus → correct mapped PATCH URLs", async () => {
    patch.mockResolvedValue({ data: {} });

    await updateStatus(10, "Checked-In");
    expect(patch).toHaveBeenCalledWith("/reservations/10/checkedin");

    await updateStatus(10, "Cancelled");
    expect(patch).toHaveBeenCalledWith("/reservations/10/cancel");
  });

  test("getRestaurantsOnly → '/restaurants'", async () => {
    get.mockResolvedValue({ data: [] });

    await getRestaurantsOnly();
    expect(get).toHaveBeenCalledWith("/restaurants");
  });

  test("getRestaurant → '/restaurants/:id'", async () => {
    get.mockResolvedValue({ data: {} });

    await getRestaurant(99);
    expect(get).toHaveBeenCalledWith("/restaurants/99");
  });

  test("getTablesByRestaurant → '/restaurants/:id/tables'", async () => {
    get.mockResolvedValue({ data: [] });

    await getTablesByRestaurant(7);
    expect(get).toHaveBeenCalledWith("/restaurants/7/tables");
  });

  test("getTable → '/tables/:id'", async () => {
    get.mockResolvedValue({ data: {} });

    await getTable(3);

    expect(get).toHaveBeenCalledWith("/tables/3");
  });
});
