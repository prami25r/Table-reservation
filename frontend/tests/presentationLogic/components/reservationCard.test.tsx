import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";
import ReservationCard from "../../../src/components/cards/reservationcard";

describe("ReservationCard (RN)", () => {
  const baseProps = {
    restaurantName: "Food Hub",
    restaurantLocation: "Anna Nagar",
    date: "2025-01-20",
    time: "7:30 PM",
    guests: 4,
    status: "Upcoming",
    onCancel: jest.fn(),
  };

  beforeEach(() => jest.clearAllMocks());

  const renderUI = (props = {}) =>
    render(<ReservationCard {...baseProps} {...props} />);

  test("renders details", () => {
    renderUI();

    expect(screen.getByText("Food Hub")).toBeTruthy();
    expect(screen.getByText("Anna Nagar")).toBeTruthy();
    expect(screen.getByText("2025-01-20")).toBeTruthy();
    expect(screen.getByText("7:30 PM")).toBeTruthy();
    expect(screen.getByText("4 guests")).toBeTruthy();
  });

  test("expands and shows cancel button", () => {
    renderUI();

    fireEvent.press(screen.getByTestId("card-header"));

    expect(screen.getByTestId("cancel-button")).toBeTruthy();
  });

  test("cancel button triggers onCancel", () => {
    renderUI();

    fireEvent.press(screen.getByTestId("card-header"));
    fireEvent.press(screen.getByTestId("cancel-button"));

    expect(baseProps.onCancel).toHaveBeenCalledTimes(1);
  });

  test("does NOT show cancel button when status != Upcoming", () => {
    renderUI({ status: "Checked-In" });

    fireEvent.press(screen.getByTestId("card-header"));

    expect(screen.queryByTestId("cancel-button")).toBeNull();
  });
});
