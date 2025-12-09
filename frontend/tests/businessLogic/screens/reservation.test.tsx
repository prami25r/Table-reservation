import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react-native";
import ReservationsScreen from "../../../src/screens/reservation/reservation";
import { Platform, TouchableOpacity, Text, View } from "react-native";

const mockGetRestaurants = jest.fn();
const mockGetReservations = jest.fn();

jest.mock("../../../src/api/reservation", () => ({
  getRestaurants: (...args: any[]) => mockGetRestaurants(...args),
  getReservations: (...args: any[]) => mockGetReservations(...args),
}));


const mockDispatch = jest.fn();

jest.mock("../../../src/redux/hooks", () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (selector: any) => selector({ reservation: { list: [] } }),
}));


jest.mock("../../../src/screens/reservation/upcoming", () => () => (
  <Text testID="upcoming">UpcomingMock</Text>
));

jest.mock("../../../src/screens/reservation/checkedIn", () => () => (
  <Text testID="checkedin">CheckedInMock</Text>
));

jest.mock("../../../src/screens/reservation/cancelled", () => () => (
  <Text testID="cancelled">CancelledMock</Text>
));


jest.mock("../../../src/components/sortfilterbar", () => (props: any) => (
  <View>
    <TouchableOpacity
      testID="sort-trigger"
      onPress={() => props.onSort?.("guests", "asc")}
    />
    <TouchableOpacity
      testID="filter-trigger"
      onPress={() => props.onFilterRestaurant?.(2)}
    />
  </View>
));

jest.mock("../../../src/components/webCard/webLayout", () => (props: any) => (
  <View>
    <View testID="web-sidebar">{props.sidebar}</View>
    <View testID="web-fab">{props.fab}</View>
    <View testID="web-children">{props.children}</View>
  </View>
));

jest.mock("../../../src/components/webCard/webSortsidebar", () => (props: any) => (
  <Text testID="websort-initial">{props.initial?.type}</Text>
));



describe("ReservationsScreen", () => {
  const navigation = { navigate: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();

    mockGetRestaurants.mockResolvedValue({
      data: [{ id: 1, name: "Food Hub" }],
    });

    mockGetReservations.mockResolvedValue({
      data: [{ id: 10, restaurantId: 1 }],
    });

    Platform.OS = "ios";
  });

  
  test("renders Upcoming tab by default", async () => {
    await act(async () => {
      render(<ReservationsScreen navigation={navigation} />);
    });

    expect(screen.getByText("Upcoming")).toBeTruthy();
    expect(screen.getByTestId("upcoming")).toBeTruthy();
    expect(mockGetRestaurants).toHaveBeenCalledTimes(1);
    expect(mockGetReservations).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalled();
  });

  test("switching tabs renders Checked-In and Cancelled", async () => {
    await act(async () => {
      render(<ReservationsScreen navigation={navigation} />);
    });

    fireEvent.press(screen.getByText("Checked-In"));
    expect(screen.getByTestId("checkedin")).toBeTruthy();

    fireEvent.press(screen.getByText("Cancelled"));
    expect(screen.getByTestId("cancelled")).toBeTruthy();
  });


  test("FAB navigates to NewReservation on mobile", async () => {
    const ui = render(<ReservationsScreen navigation={navigation} />);

    await act(async () => {});

    const touchables = ui.UNSAFE_getAllByType(TouchableOpacity);
    const fab = touchables[touchables.length - 1];

    act(() => {
      fab.props.onPress();
    });

    expect(navigation.navigate).toHaveBeenCalledWith("NewReservation");
  });


  test("renders web layout when Platform is web + desktop", async () => {
    jest.resetModules();

    jest.doMock("../../../src/utils/responsive", () => ({
      useResponsive: () => ({
        isPhone: false,
        isTablet: false,
        isDesktop: true,
      }),
    }));

    Platform.OS = "web";

    const ScreenWeb =
      require("../../../src/screens/reservation/reservation").default;

    await act(async () => {
      render(<ScreenWeb navigation={navigation} />);
    });

    expect(screen.getByTestId("web-sidebar")).toBeTruthy();
    expect(screen.getByTestId("web-fab")).toBeTruthy();
    expect(screen.getByTestId("websort-initial")).toBeTruthy();
  });

});
