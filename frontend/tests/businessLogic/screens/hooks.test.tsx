import { renderHook, act } from "@testing-library/react-native";
import useNewReservation from "../../../src/screens/newreservation/hooks";
import {
  getRestaurants,
  createReservation,
  updateReservation,
} from "../../../src/api/reservation";

jest.mock("../../../src/api/reservation");

const mockNavigate = jest.fn();
const navigation = { navigate: mockNavigate };

describe("useNewReservation Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockRestaurants = [
    { id: 1, name: "Food Hub" },
    { id: 2, name: "A2B" },
  ];

  (getRestaurants as jest.Mock).mockResolvedValue({ data: mockRestaurants });

  test("fetches restaurants on mount", async () => {
    const reservation = null;

    const { result } = renderHook(() =>
      useNewReservation(navigation, reservation)
    );

    expect(getRestaurants).toHaveBeenCalledTimes(1);

    // wait for async state update
    await act(async () => {});

    expect(result.current.restaurants).toEqual(mockRestaurants);
  });

  test("initializes with reservation values when editing", () => {
    const reservation = {
      id: 99,
      customer: {
        fullName: "John Doe",
        mobileNumber: "9999999999",
        email: "john@mail.com",
      },
      restaurantId: 2,
      guestCount: 5,
      specialRequests: "Window seat",
      reservationDate: "2025-01-10T12:00:00Z",
    };

    const { result } = renderHook(() =>
      useNewReservation(navigation, reservation)
    );

    expect(result.current.fullName).toBe("John Doe");
    expect(result.current.mobileNumber).toBe("9999999999");
    expect(result.current.email).toBe("john@mail.com");
    expect(result.current.restaurantId).toBe(2);
    expect(result.current.guestCount).toBe("5");
    expect(result.current.specialRequests).toBe("Window seat");
  });

  test("save() should call createReservation when no existing reservation", async () => {
    const reservation = null;

    const { result } = renderHook(() =>
      useNewReservation(navigation, reservation)
    );

    await act(async () => {
      await result.current.save();
    });

    expect(createReservation).toHaveBeenCalledTimes(1);
    expect(updateReservation).not.toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("Reservations");
  });

  test("save() should call updateReservation when editing", async () => {
    const reservation = {
      id: 123,
      guestCount: 2,
      reservationDate: "2025-01-10T12:00:00Z",
      customer: {},
    };

    const { result } = renderHook(() =>
      useNewReservation(navigation, reservation)
    );

    await act(async () => {
      await result.current.save();
    });

    expect(updateReservation).toHaveBeenCalledTimes(1);
    expect(updateReservation).toHaveBeenCalledWith(
      123,
      expect.objectContaining({
        reservationDate: expect.any(Date),
        guestCount: expect.any(Number),
      })
    );

    expect(createReservation).not.toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("Reservations");
  });

  test("save() merges date and time correctly", async () => {
    const reservation = null;

    const { result } = renderHook(() =>
      useNewReservation(navigation, reservation)
    );

   
    const customDate = new Date(2025, 4, 25); 
    const customTime = new Date(2025, 4, 25, 17, 45); 

    act(() => {
      result.current.setDate(customDate);
      result.current.setTime(customTime);
    });

    await act(async () => {
      await result.current.save();
    });

    expect(createReservation).toHaveBeenCalledWith(
      expect.objectContaining({
        reservationDate: new Date(2025, 4, 25, 17, 45, 0, 0),
      })
    );
  });

  test("save() logs error but does not crash", async () => {
    (createReservation as jest.Mock).mockRejectedValueOnce(
      new Error("Network error")
    );

    const reservation = null;

    const { result } = renderHook(() =>
      useNewReservation(navigation, reservation)
    );

    await act(async () => {
      await result.current.save();
    });

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
