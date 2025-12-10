import React from "react";
import { render } from "@testing-library/react-native";
import NewReservation from "../../../src/screens/newreservation/newreservation";
import NewReservationForm from "../../../src/screens/newreservation/newreservationform";
import useNewreservation from "../../../src/screens/newreservation/hooks";


jest.mock(
  "../../../src/screens/newreservation/newreservationform",
  () => jest.fn(() => null)
);


jest.mock(
  "../../../src/screens/newreservation/hooks",
  () => jest.fn()
);

describe("NewReservation Screen", () => {
  const mockNavigation = { navigate: jest.fn() };
  const mockReservation = { id: 1, name: "Test Reservation" };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders ScrollView and passes hook props to NewReservationForm", () => {
    const hookReturn = { fullName: "Sunny", mobileNumber: "9999999999" };
    (useNewreservation as jest.Mock).mockReturnValue(hookReturn);

    render(
      <NewReservation
        navigation={mockNavigation}
        route={{ params: { reservation: mockReservation } }}
      />
    );

  
    expect(useNewreservation).toHaveBeenCalledWith(
      mockNavigation,
      mockReservation
    );

   
    expect(NewReservationForm).toHaveBeenCalledWith(
      expect.objectContaining(hookReturn),
      undefined
    );
  });

  test("handles case where reservation is null", () => {
    const hookReturn = {};
    (useNewreservation as jest.Mock).mockReturnValue(hookReturn);

    render(
      <NewReservation
        navigation={mockNavigation}
        route={{ params: {} }}
      />
    );

    expect(useNewreservation).toHaveBeenCalledWith(
      mockNavigation,
      null
    );
  });
});
