import { renderHook, act } from "@testing-library/react-native";
import { useReservationsLogic } from "../../../src/screens/reservation/useReservationhooks";

import {
  getRestaurants,
  getReservations,
} from "../../../src/api/reservation";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../src/redux/hooks";

import { setReservations } from "../../../src/redux/slices/reservationslice";

import {
  mockReservation,
  mockRestaurant,
} from "../../../mocks/reservationMocks";

jest.mock("../../../src/api/reservation", () => ({
  getRestaurants: jest.fn(),
  getReservations: jest.fn(),
}));

jest.mock("../../../src/redux/hooks", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

describe("useReservationsLogic", () => {
  let mockDispatch: jest.Mock;

  beforeEach(() => {
    mockDispatch = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

    // return empty reservation list by default
    (useAppSelector as jest.Mock).mockReturnValue([]);
  });

  // -----------------------------
  // RESTAURANTS
  // -----------------------------
  it("loads restaurants on mount", async () => {
    (getRestaurants as jest.Mock).mockResolvedValue({
      data: [mockRestaurant({ id: 1 })],
    });

    const { result } = renderHook(() => useReservationsLogic());

    await act(async () => {});

    expect(getRestaurants).toHaveBeenCalled();
    expect(result.current.restaurants).toEqual([mockRestaurant({ id: 1 })]);
  });

  // -----------------------------
  // RESERVATIONS
  // -----------------------------
  it("loads reservations and dispatches them", async () => {
    (getReservations as jest.Mock).mockResolvedValue({
      data: [mockReservation({ id: 11 })],
    });

    renderHook(() => useReservationsLogic());

    await act(async () => {});

    expect(getReservations).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith(
      setReservations([mockReservation({ id: 11 })])
    );
  });

  it("handles restaurant load failures safely", async () => {
    (getRestaurants as jest.Mock).mockRejectedValue(new Error("fail"));

    const { result } = renderHook(() => useReservationsLogic());

    await act(async () => {});

    expect(result.current.restaurants).toEqual([]);
  });

  it("logs reservations load errors", async () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    (getReservations as jest.Mock).mockRejectedValue(new Error("network"));

    renderHook(() => useReservationsLogic());

    await act(async () => {});

    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  // -----------------------------
  // SORT
  // -----------------------------
  it("updates sortConfig when handleSort is called", () => {
    const { result } = renderHook(() => useReservationsLogic());

    act(() => result.current.handleSort("guests", "asc"));

    expect(result.current.sortConfig).toEqual({
      type: "guests",
      order: "asc",
    });
  });

  // -----------------------------
  // FILTER
  // -----------------------------
  it("updates restaurantFilter", () => {
    const { result } = renderHook(() => useReservationsLogic());

    act(() => result.current.handleFilter(20));

    expect(result.current.restaurantFilter).toBe(20);
  });

  it("sets filter back to null", () => {
    const { result } = renderHook(() => useReservationsLogic());

    act(() => result.current.handleFilter(null));

    expect(result.current.restaurantFilter).toBeNull();
  });

  // -----------------------------
  // ACTIVE TAB
  // -----------------------------
  it("active tab updates correctly", () => {
    const { result } = renderHook(() => useReservationsLogic());

    act(() => result.current.setActive("Checked-In"));
    expect(result.current.active).toBe("Checked-In");

    act(() => result.current.setActive("Cancelled"));
    expect(result.current.active).toBe("Cancelled");
  });
});
