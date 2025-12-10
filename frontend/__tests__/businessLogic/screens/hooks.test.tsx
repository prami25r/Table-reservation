import { renderHook, act, waitFor } from "@testing-library/react-native";
import useNewReservation from "../../../src/screens/newreservation/hooks";

const mockGetRestaurants = jest.fn();
const mockCreateReservation = jest.fn();
const mockUpdateReservation = jest.fn();

jest.mock("../../../src/api/reservation", () => ({
  __esModule: true,
  default: {},
  getRestaurants: mockGetRestaurants,
  createReservation: mockCreateReservation,
  updateReservation: mockUpdateReservation,
}));

const mockNavigate = jest.fn();
const mockNavigation = { navigate: mockNavigate };

describe("useNewReservation Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetRestaurants.mockResolvedValue({ data: [] });
    mockCreateReservation.mockResolvedValue({});
    mockUpdateReservation.mockResolvedValue({});
  });

  test("initializes state correctly WITHOUT reservation", () => {
    const { result } = renderHook(() =>
      useNewReservation(mockNavigation, null)
    );

    expect(result.current.fullName).toBe("");
    expect(result.current.mobileNumber).toBe("");
    expect(result.current.email).toBe("");
    expect(result.current.restaurantId).toBe("");
    expect(result.current.guestCount).toBe("");
    expect(result.current.specialRequests).toBe("");
    expect(result.current.restaurants).toEqual([]);
    expect(result.current.showDatePicker).toBe(false);
    expect(result.current.showTimePicker).toBe(false);
  });

  test("initializes state correctly WITH reservation", () => {
    const reservation = {
      id: 10,
      restaurantId: 5,
      guestCount: 4,
      specialRequests: "quiet corner",
      reservationDate: "2024-01-10T10:00:00Z",
      customer: {
        fullName: "John Doe",
        mobileNumber: "1234567890",
        email: "john@example.com",
      },
    };

    const { result } = renderHook(() =>
      useNewReservation(mockNavigation, reservation)
    );

    expect(result.current.fullName).toBe("John Doe");
    expect(result.current.mobileNumber).toBe("1234567890");
    expect(result.current.email).toBe("john@example.com");
    expect(result.current.restaurantId).toBe(5);
    expect(result.current.guestCount).toBe("4");
    expect(result.current.specialRequests).toBe("quiet corner");
  });

  test("fetches restaurants successfully", async () => {
    mockGetRestaurants.mockResolvedValueOnce({
      data: [{ id: 1, name: "Test Resto" }],
    });

    const { result } = renderHook(() =>
      useNewReservation(mockNavigation, null)
    );

    await waitFor(() => {
      expect(result.current.restaurants).toEqual([
        { id: 1, name: "Test Resto" },
      ]);
    });

    expect(mockGetRestaurants).toHaveBeenCalled();
  });

  test("handles restaurant fetch error", async () => {
    mockGetRestaurants.mockRejectedValueOnce("Network error");

    const { result } = renderHook(() =>
      useNewReservation(mockNavigation, null)
    );

    await waitFor(() => {
      expect(result.current.restaurants).toEqual([]);
    });
  });

  test("creates a reservation when no reservation exists", async () => {
    mockCreateReservation.mockResolvedValueOnce({});
    mockGetRestaurants.mockResolvedValueOnce({ data: [] });

    const { result } = renderHook(() =>
      useNewReservation(mockNavigation, null)
    );

    await waitFor(() => {
      expect(result.current.restaurants).toEqual([]);
    });

    act(() => {
      result.current.setFullName("Sunny");
      result.current.setMobileNumber("9999999999");
      result.current.setEmail("sunny@example.com");
      result.current.setRestaurantId("2");
      result.current.setGuestCount("3");
      result.current.setSpecialRequests("Window seat");
    });

    await act(async () => {
      await result.current.save();
    });

    expect(mockCreateReservation).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("Reservations");
  });

  test("updates a reservation when reservation exists", async () => {
    const reservation = {
      id: 5,
      restaurantId: 2,
      guestCount: 2,
      specialRequests: "none",
      reservationDate: "2024-01-10T10:00:00Z",
      customer: {},
    };

    mockUpdateReservation.mockResolvedValueOnce({});
    mockGetRestaurants.mockResolvedValueOnce({ data: [] });

    const { result } = renderHook(() =>
      useNewReservation(mockNavigation, reservation)
    );

    await waitFor(() => {
      expect(result.current.restaurants).toEqual([]);
    });

    act(() => {
      result.current.setGuestCount("6");
      result.current.setSpecialRequests("Birthday");
    });

    await act(async () => {
      await result.current.save();
    });

    expect(mockUpdateReservation).toHaveBeenCalledTimes(1);
    expect(mockUpdateReservation).toHaveBeenCalledWith(5, {
      reservationDate: expect.any(Date),
      guestCount: 6,
      specialRequests: "Birthday",
    });

    expect(mockNavigate).toHaveBeenCalledWith("Reservations");
  });

  test("save handles API errors without crashing", async () => {
    mockCreateReservation.mockRejectedValueOnce("ERROR");
    mockGetRestaurants.mockResolvedValueOnce({ data: [] });

    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    const { result } = renderHook(() =>
      useNewReservation(mockNavigation, null)
    );

    await waitFor(() => {
      expect(result.current.restaurants).toEqual([]);
    });

    await act(async () => {
      await result.current.save();
    });

    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
