import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
} from "@testing-library/react-native";
import NewReservationForm from "../../../src/screens/newreservation/newreservationform";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";


jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

jest.mock("react-native-toast-message", () => ({
  show: jest.fn(),
}));


describe("NewReservationForm", () => {
  const mockNavigate = jest.fn();
  (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });

  const defaultProps = {
    fullName: "",
    setFullName: jest.fn(),
    mobileNumber: "",
    setMobileNumber: jest.fn(),
    email: "",
    setEmail: jest.fn(),
    restaurantId: null,
    setRestaurantId: jest.fn(),
    restaurants: [
      { id: 1, name: "Food Hub" },
      { id: 2, name: "A2B" },
    ],
    date: null,
    setDate: jest.fn(),
    time: null,
    setTime: jest.fn(),
    showDatePicker: false,
    setShowDatePicker: jest.fn(),
    showTimePicker: false,
    setShowTimePicker: jest.fn(),
    guestCount: "",
    setGuestCount: jest.fn(),
    specialRequests: "",
    setSpecialRequests: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders form fields", () => {
    render(<NewReservationForm {...defaultProps} />);

    expect(screen.getByText("Reserve Your Table")).toBeTruthy();
    expect(screen.getByPlaceholderText("Enter full name")).toBeTruthy();
    expect(screen.getByPlaceholderText("Enter mobile number")).toBeTruthy();
    expect(screen.getByPlaceholderText("Enter email")).toBeTruthy();
  });

  test("shows validation error toast when required fields are empty", async () => {
    render(<NewReservationForm {...defaultProps} />);

    fireEvent.press(screen.getByText("Confirm Reservation"));

    expect(Toast.show).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "error",
        text1: "Missing required fields",
      })
    );
  });

  test("selects restaurant from dropdown", () => {
    render(<NewReservationForm {...defaultProps} />);

    fireEvent.press(screen.getByText("Select a restaurant"));

    fireEvent.press(screen.getByText("A2B"));

    expect(defaultProps.setRestaurantId).toHaveBeenCalledWith(2);
  });

  test("opens date picker and selects date", () => {
    const props = {
      ...defaultProps,
      showDatePicker: true,
    };

    render(<NewReservationForm {...props} />);

    fireEvent.press(screen.getByTestId("mock-datetime-picker"));

    expect(props.setDate).toHaveBeenCalled();
  });

  test("opens time picker and selects time", () => {
    const props = {
      ...defaultProps,
      showTimePicker: true,
    };

    render(<NewReservationForm {...props} />);

    fireEvent.press(screen.getByTestId("mock-datetime-picker"));

    expect(props.setTime).toHaveBeenCalled();
  });

  test("calls save() and navigates on success", async () => {
    const props = {
      ...defaultProps,
      fullName: "John Doe",
      mobileNumber: "9999999999",
      email: "john@mail.com",
      restaurantId: 1,
      date: new Date(),
      time: new Date(),
      guestCount: "3",
      save: jest.fn().mockResolvedValue(true),
    };

    render(<NewReservationForm {...props} />);

    await act(async () => {
      fireEvent.press(screen.getByText("Confirm Reservation"));
    });

    expect(props.save).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("Reservations");
  });

  test("shows toast when save() fails", async () => {
    const props = {
      ...defaultProps,
      fullName: "John Doe",
      mobileNumber: "9999999999",
      email: "john@mail.com",
      restaurantId: 1,
      date: new Date(),
      time: new Date(),
      guestCount: "3",
      save: jest.fn().mockRejectedValue(new Error("fail")),
    };

    render(<NewReservationForm {...props} />);

    await act(async () => {
      fireEvent.press(screen.getByText("Confirm Reservation"));
    });

    expect(Toast.show).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "error",
        text1: "No available tables",
      })
    );
  });

  test("pressing Cancel navigates back", () => {
    render(<NewReservationForm {...defaultProps} />);

    fireEvent.press(screen.getByText("Cancel"));

    expect(mockNavigate).toHaveBeenCalledWith("Reservations");
  });
});
