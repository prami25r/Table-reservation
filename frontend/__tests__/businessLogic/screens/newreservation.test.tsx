import React from "react";
import { render } from "@testing-library/react-native";

jest.mock("../../../src/screens/newreservation/hooks", () => jest.fn());
jest.mock("../../../src/screens/newreservation/logic", () => ({
  useNewReservationFormLogic: jest.fn(),
}));
jest.mock("../../../src/screens/newreservation/newreservationform", () =>
  jest.fn(() => null)
);

import useNewReservation from "../../../src/screens/newreservation/hooks";
import { useNewReservationFormLogic } from "../../../src/screens/newreservation/logic";
import NewReservationForm from "../../../src/screens/newreservation/newreservationform";
import NewReservation from "../../../src/screens/newreservation/newreservation";

describe("NewReservation component", () => {
  const navigation = { navigate: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("wires form and ui props together", () => {
    (useNewReservation as jest.Mock).mockReturnValue({
      fullName: "Test",
      setFullName: jest.fn(),
      mobileNumber: "123",
      setMobileNumber: jest.fn(),
      email: "a@b.com",
      setEmail: jest.fn(),
      restaurantId: 1,
      setRestaurantId: jest.fn(),
      guestCount: "2",
      setGuestCount: jest.fn(),
      specialRequests: "",
      setSpecialRequests: jest.fn(),
      date: new Date(),
      setDate: jest.fn(),
      time: new Date(),
      setTime: jest.fn(),
      showDatePicker: false,
      setShowDatePicker: jest.fn(),
      showTimePicker: false,
      setShowTimePicker: jest.fn(),
      restaurants: [],
      save: jest.fn(),
    });

    (useNewReservationFormLogic as jest.Mock).mockReturnValue({
      errors: {},
      showRestaurantMenu: false,
      setShowRestaurantMenu: jest.fn(),
      handleSubmit: jest.fn(),
      handleCancel: jest.fn(),
      handleDateChange: jest.fn(),
      handleTimeChange: jest.fn(),
    });

    render(<NewReservation navigation={navigation} route={{ params: {} }} />);

    expect(useNewReservation).toHaveBeenCalled();
    expect(useNewReservationFormLogic).toHaveBeenCalledWith({
      save: expect.any(Function),
    });
    expect(NewReservationForm).toHaveBeenCalled();
  });
});

