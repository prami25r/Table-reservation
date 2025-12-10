import { renderHook, act } from "@testing-library/react-native";
import { useNewReservationFormLogic } from "../../../src/screens/newreservation/logic";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

jest.mock("react-native-toast-message", () => ({
  show: jest.fn(),
}));

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

describe("useNewReservationFormLogic", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });
  });

  const setup = (saveMock = jest.fn().mockResolvedValue(undefined)) =>
    renderHook(() => useNewReservationFormLogic({ save: saveMock }));

  
  it("sets errors when required fields are missing", () => {
    const { result } = setup();

    act(() => {
      result.current.handleSubmit();
    });

    expect(result.current.errors.fullName).toBe(true);
    expect(result.current.errors.mobileNumber).toBe(true);
    expect(result.current.errors.email).toBe(true);
    expect(result.current.errors.restaurantId).toBe(true);
    expect(result.current.errors.date).toBe(true);
    expect(result.current.errors.time).toBe(true);
    expect(result.current.errors.guestCount).toBe(true);

    expect(Toast.show).toHaveBeenCalled();
  });


  it("submits successfully when validation passes", async () => {
    const saveMock = jest.fn().mockResolvedValue(undefined);
    const { result } = setup(saveMock);

    act(() => {
      result.current.setFullName("John Doe");
      result.current.setMobileNumber("9876543210");
      result.current.setEmail("john@example.com");
      result.current.setRestaurantId(1);
      result.current.setDate(new Date());
      result.current.setTime(new Date());
      result.current.setGuestCount(2);
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(saveMock).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("Reservations");
  });


  it("shows error toast when save throws error", async () => {
    const failingSave = jest.fn().mockRejectedValue(new Error("No tables"));
    const { result } = setup(failingSave);

    act(() => {
      result.current.setFullName("John");
      result.current.setMobileNumber("1234567890");
      result.current.setEmail("test@test.com");
      result.current.setRestaurantId(1);
      result.current.setDate(new Date());
      result.current.setTime(new Date());
      result.current.setGuestCount(3);
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(Toast.show).toHaveBeenCalled();
  });

 
  it("navigates back on handleCancel", () => {
    const { result } = setup();

    act(() => {
      result.current.handleCancel();
    });

    expect(mockNavigate).toHaveBeenCalledWith("Reservations");
  });

  it("updates date on date change", () => {
    const { result } = setup();

    const newDate = new Date("2025-02-01");

    act(() => {
      result.current.handleDateChange(null, newDate);
    });

    expect(result.current.date).toEqual(newDate);
    expect(result.current.showDatePicker).toBe(false);
  });

  it("updates time on time change", () => {
    const { result } = setup();

    const newTime = new Date("2025-02-01T10:30");

    act(() => {
      result.current.handleTimeChange(null, newTime);
    });

    expect(result.current.time).toEqual(newTime);
    expect(result.current.showTimePicker).toBe(false);
  });

  // ----------------------------------------------------
  // RESTAURANT MENU
  // ----------------------------------------------------
  it("toggles restaurant menu state", () => {
    const { result } = setup();

    act(() => {
      result.current.setShowRestaurantMenu(true);
    });

    expect(result.current.showRestaurantMenu).toBe(true);
  });
});
