import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import Upcoming from "../../../src/screens/reservation/upcoming";
import { Alert } from "react-native";

const mockDispatch = jest.fn();
jest.mock("../../../src/redux/hooks", () => ({
  useAppDispatch: () => mockDispatch,
}));

jest.mock("../../../src/api/reservation", () => ({
  updateStatus: jest.fn(),
}));

jest.mock("../../../src/utils/date", () => ({
  formatDate: jest.fn(() => "01 Dec"),
  formatTime: jest.fn(() => "10:00 AM"),
}));

const mockUpdateStatus = require("../../../src/api/reservation").updateStatus;

jest.mock("../../../src/components/cards/reservationcard", () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

import ReservationCardMock from "../../../src/components/cards/reservationcard";

describe("Upcoming Screen", () => {
  const sampleData = [
    {
      id: 1,
      status: "Upcoming",
      reservationDate: "2025-12-01T10:00:00Z",
      guestCount: 2,
      restaurantId: 10,
      restaurant: { name: "A", location: "X" },
    },
    {
      id: 2,
      status: "Checked-In",
      reservationDate: "2025-12-02T10:00:00Z",
      guestCount: 4,
      restaurantId: 20,
      restaurant: { name: "B", location: "Y" },
    },
    {
      id: 3,
      status: "Upcoming",
      reservationDate: "2025-12-03T10:00:00Z",
      guestCount: 1,
      restaurantId: 10,
      restaurant: { name: "C", location: "Z" },
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockUpdateStatus.mockResolvedValue({});
    (ReservationCardMock as jest.Mock).mockClear();
  });

  test("renders only Upcoming items", () => {
    render(<Upcoming data={sampleData} />);

    const names = (ReservationCardMock as jest.Mock).mock.calls.map(
      (c: any[]) => c[0].restaurantName
    );

    expect(names).toEqual(["A", "C"]);
  });

  test("filters by restaurantFilter", () => {
    render(<Upcoming data={sampleData} restaurantFilter={10} />);

    const names = (ReservationCardMock as jest.Mock).mock.calls.map(
      (c: any[]) => c[0].restaurantName
    );

    expect(names).toEqual(["A", "C"]);
  });

  test("sorts by date ASC", () => {
    const sort = { type: "date", order: "asc" } as const;

    render(<Upcoming data={sampleData} sort={sort} />);

    const names = (ReservationCardMock as jest.Mock).mock.calls.map(
      (c: any[]) => c[0].restaurantName
    );

    expect(names).toEqual(["A", "C"]);
  });

  test("sorts by date DESC", () => {
    const sort = { type: "date", order: "desc" } as const;

    render(<Upcoming data={sampleData} sort={sort} />);

    const names = (ReservationCardMock as jest.Mock).mock.calls.map(
      (c: any[]) => c[0].restaurantName
    );

    expect(names).toEqual(["C", "A"]);
  });

  test("sorts by guests DESC", () => {
    const sort = { type: "guests", order: "desc" } as const;

    render(<Upcoming data={sampleData} sort={sort} />);

    const guests = (ReservationCardMock as jest.Mock).mock.calls.map(
      (c: any[]) => c[0].guests
    );

    expect(guests).toEqual([2, 1]);
  });

  test("sorts by guests ASC", () => {
    const sort = { type: "guests", order: "asc" } as const;

    render(<Upcoming data={sampleData} sort={sort} />);

    const guests = (ReservationCardMock as jest.Mock).mock.calls.map(
      (c: any[]) => c[0].guests
    );

    expect(guests).toEqual([1, 2]);
  });

  test("calls updateStatus & dispatch on cancel success", async () => {
    const { getByText } = render(<Upcoming data={sampleData} />);

    const card = getByText(/"id":1/);
    const parsed = JSON.parse(card.props.children);

    await act(async () => {
      await parsed.onCancel();
    });

    expect(mockUpdateStatus).toHaveBeenCalledWith(1, "Cancelled");
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: { id: 1, status: "Cancelled" },
      type: "reservation/updateStatus",
    });
  });

  test("shows Alert on cancel failure", async () => {
    mockUpdateStatus.mockRejectedValueOnce(new Error("fail"));
    jest.spyOn(Alert, "alert").mockImplementation(() => {});

    const { getByText } = render(<Upcoming data={sampleData} />);

    const card = getByText(/"id":1/);
    const parsed = JSON.parse(card.props.children);

    await act(async () => {
      await parsed.onCancel();
    });

    expect(Alert.alert).toHaveBeenCalledWith("Error", "Unable to cancel reservation");
  });
});
