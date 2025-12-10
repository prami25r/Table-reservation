import React from "react";
import { render } from "@testing-library/react-native";
import { Text } from "react-native";
import CheckedIn from "../../../src/screens/reservation/checkedIn";


jest.mock("../../../src/utils/date", () => ({
  formatDate: jest.fn(() => "01 Dec"),
  formatTime: jest.fn(() => "10:00 AM"),
}));


jest.mock("../../../src/components/cards/reservationcard", () => {
  const { Text } = require("react-native");
  return function MockReservationCard(props: any) {
    return <Text>{JSON.stringify(props)}</Text>;
  };
});

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

  beforeEach(() => jest.clearAllMocks());

  test("renders only Checked-In items", () => {
    const { getByText } = render(<CheckedIn data={sampleData} />);

    expect(getByText(/"restaurantName":"A"/)).toBeTruthy();
    expect(getByText(/"restaurantName":"C"/)).toBeTruthy();

    // Should NOT render Upcoming items
    expect(() => getByText(/"restaurantName":"B"/)).toThrow();
  });

  test("filters by restaurantFilter", () => {
    const { getByText, queryByText } = render(
      <CheckedIn data={sampleData} restaurantFilter={10} />
    );

    expect(getByText(/"restaurantName":"A"/)).toBeTruthy();
    expect(queryByText(/"restaurantName":"C"/)).toBeNull();
  });

  test("sorts by date ASC", () => {
    const sort = { type: "date", order: "asc" } as const;

    const { getAllByText } = render(<CheckedIn data={sampleData} sort={sort} />);

    const items = getAllByText(/restaurantName/).map((n) => n.props.children);

    expect(items[0]).toContain('"id":1'); 
    expect(items[1]).toContain('"id":3'); 
  });

  test("sorts by date DESC", () => {
    const sort = { type: "date", order: "desc" } as const;

    const { getAllByText } = render(<CheckedIn data={sampleData} sort={sort} />);

    const items = getAllByText(/restaurantName/).map((n) => n.props.children);

    expect(items[0]).toContain('"id":3');
    expect(items[1]).toContain('"id":1');
  });

  test("sorts by guests DESC", () => {
    const sort = { type: "guests", order: "desc" } as const;

    const { getAllByText } = render(<CheckedIn data={sampleData} sort={sort} />);

    const items = getAllByText(/guestCount/).map((n) => n.props.children);

    expect(items[0]).toContain('"guestCount":2'); 
    expect(items[1]).toContain('"guestCount":1');
  });

  test("sorts by guests ASC", () => {
    const sort = { type: "guests", order: "asc" } as const;

    const { getAllByText } = render(<CheckedIn data={sampleData} sort={sort} />);

    const items = getAllByText(/guestCount/).map((n) => n.props.children);

    expect(items[0]).toContain('"guestCount":1');
    expect(items[1]).toContain('"guestCount":2');
  });
});
