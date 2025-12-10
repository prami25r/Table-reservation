import React from "react";
import { render } from "@testing-library/react-native";
import CheckedIn from "../../../src/screens/reservation/checkedIn";


jest.mock("../../../src/utils/date", () => ({
  formatDate: jest.fn(() => "01 Dec"),
  formatTime: jest.fn(() => "10:00 AM"),
}));


jest.mock("../../../src/components/cards/reservationcard", () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

import ReservationCardMock from "../../../src/components/cards/reservationcard";

describe("CheckedIn Screen", () => {
  const sampleData = [
    {
      id: 1,
      status: "Checked-In",
      reservationDate: "2025-12-01T10:00:00Z",
      guestCount: 2,
      restaurantId: 10,
      restaurant: { name: "A", location: "X" },
    },
    {
      id: 2,
      status: "Upcoming",
      reservationDate: "2025-12-02T10:00:00Z",
      guestCount: 5,
      restaurantId: 10,
      restaurant: { name: "B", location: "Y" },
    },
    {
      id: 3,
      status: "Checked-In",
      reservationDate: "2025-12-03T10:00:00Z",
      guestCount: 1,
      restaurantId: 20,
      restaurant: { name: "C", location: "Z" },
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (ReservationCardMock as jest.Mock).mockClear();
  });

  test("renders only Checked-In items", () => {
    render(<CheckedIn data={sampleData} />);

    const names = (ReservationCardMock as jest.Mock).mock.calls.map(
      (c: any[]) => c[0].restaurantName
    );

    expect(names).toEqual(["A", "C"]);
  });

  test("filters by restaurantFilter", () => {
    render(<CheckedIn data={sampleData} restaurantFilter={10} />);

    const names = (ReservationCardMock as jest.Mock).mock.calls.map(
      (c: any[]) => c[0].restaurantName
    );

    expect(names).toEqual(["A"]);
  });

  test("sorts by date ASC", () => {
    const sort = { type: "date", order: "asc" } as const;

    render(<CheckedIn data={sampleData} sort={sort} />);

    const names = (ReservationCardMock as jest.Mock).mock.calls.map(
      (c: any[]) => c[0].restaurantName
    );

    expect(names).toEqual(["A", "C"]);
  });

  test("sorts by date DESC", () => {
    const sort = { type: "date", order: "desc" } as const;

    render(<CheckedIn data={sampleData} sort={sort} />);

    const names = (ReservationCardMock as jest.Mock).mock.calls.map(
      (c: any[]) => c[0].restaurantName
    );

    expect(names).toEqual(["C", "A"]);
  });

  test("sorts by guests DESC", () => {
    const sort = { type: "guests", order: "desc" } as const;

    render(<CheckedIn data={sampleData} sort={sort} />);

    const guests = (ReservationCardMock as jest.Mock).mock.calls.map(
      (c: any[]) => c[0].guests
    );

    expect(guests).toEqual([2, 1]);
  });

  test("sorts by guests ASC", () => {
    const sort = { type: "guests", order: "asc" } as const;

    render(<CheckedIn data={sampleData} sort={sort} />);

    const guests = (ReservationCardMock as jest.Mock).mock.calls.map(
      (c: any[]) => c[0].guests
    );

    expect(guests).toEqual([1, 2]);
  });
});
