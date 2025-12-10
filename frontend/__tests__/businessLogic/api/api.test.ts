jest.mock("axios", () => {
  const { mockAxiosInstance } = require("../../../mocks/axios");
  return {
    __esModule: true,
    default: { create: jest.fn(() => mockAxiosInstance) },
    create: jest.fn(() => mockAxiosInstance),
  };
});

jest.mock("../../../mocks/axios", () => ({
  mockAxiosInstance: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    patch: jest.fn(),
  },
}));

jest.mock("../../../src/api/axiosInstance", () => {
  const { mockAxiosInstance } = require("../../../mocks/axios");
  return mockAxiosInstance;
});

import { mockAxiosInstance } from "../../../mocks/axios";

import { getCustomers, getCustomer, createCustomer } from "../../../src/api/customer";
import { getReservations, createReservation, updateReservation, updateStatus, getRestaurants } from "../../../src/api/reservation";
import { getRestaurants as getRestaurantsOnly, getRestaurant } from "../../../src/api/restaurant";
import { getTablesByRestaurant, getTable } from "../../../src/api/table";

describe("API Layer FULL COVERAGE", () => {
  const { get, post, put, patch } = mockAxiosInstance;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getCustomers", async () => {
    get.mockResolvedValue({ data: [] });
    await getCustomers();
    expect(get).toHaveBeenCalledWith("/customers");
  });

  test("getCustomer", async () => {
    get.mockResolvedValue({ data: {} });
    await getCustomer(5);
    expect(get).toHaveBeenCalledWith("/customers/5");
  });

  test("createCustomer", async () => {
    const payload = { fullName: "Sunshine", mobileNumber: "99999" };
    post.mockResolvedValue({ data: {} });
    await createCustomer(payload);
    expect(post).toHaveBeenCalledWith("/customers", payload);
  });

  test("getReservations", async () => {
    get.mockResolvedValue({ data: [] });
    await getReservations();
    expect(get).toHaveBeenCalledWith("/reservations");
  });

  test("createReservation", async () => {
    const data = { fullName: "Test" };
    post.mockResolvedValue({ data: {} });
    await createReservation(data);
    expect(post).toHaveBeenCalledWith("/reservations", data);
  });

  test("updateReservation", async () => {
    const payload = { guestCount: 4 };
    put.mockResolvedValue({ data: {} });
    await updateReservation(2, payload);
    expect(put).toHaveBeenCalledWith("/reservations/2", payload);
  });

  test("updateStatus", async () => {
    patch.mockResolvedValue({ data: {} });
    await updateStatus(10, "Checked-In");
    expect(patch).toHaveBeenCalledWith("/reservations/10/checkedin");
    await updateStatus(10, "Cancelled");
    expect(patch).toHaveBeenCalledWith("/reservations/10/cancel");
  });

  test("getRestaurantsOnly", async () => {
    get.mockResolvedValue({ data: [] });
    await getRestaurantsOnly();
    expect(get).toHaveBeenCalledWith("/restaurants");
  });

  test("getRestaurant", async () => {
    get.mockResolvedValue({ data: {} });
    await getRestaurant(99);
    expect(get).toHaveBeenCalledWith("/restaurants/99");
  });

  test("getTablesByRestaurant", async () => {
    get.mockResolvedValue({ data: [] });
    await getTablesByRestaurant(7);
    expect(get).toHaveBeenCalledWith("/restaurants/7/tables");
  });

  test("getTable", async () => {
    get.mockResolvedValue({ data: {} });
    await getTable(3);
    expect(get).toHaveBeenCalledWith("/tables/3");
  });
});
