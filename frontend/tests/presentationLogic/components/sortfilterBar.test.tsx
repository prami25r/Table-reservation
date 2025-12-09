import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SortFilterBar from "../../../src/components/sortfilterbar";

describe("SortFilterBar (web)", () => {
  const mockSort = jest.fn();
  const mockFilter = jest.fn();

  const restaurants = [
    { id: 1, name: "BBQ Nation" },
    { id: 2, name: "A2B" },
  ];

  const renderUI = (props = {}) =>
    render(
      <SortFilterBar
        onSort={mockSort}
        onFilterRestaurant={mockFilter}
        restaurants={restaurants}
        {...props}
      />
    );

  beforeEach(() => jest.clearAllMocks());

  test("renders default labels", () => {
    renderUI();

    expect(screen.getByText("Date")).toBeInTheDocument();
    expect(screen.getByText("All Restaurants")).toBeInTheDocument();
  });

  test("toggles sort order", () => {
    renderUI();

    const btn = screen.getByTestId("sort-order-button");

    fireEvent.click(btn);
    expect(mockSort).toHaveBeenCalledWith("date", "desc");

    fireEvent.click(btn);
    expect(mockSort).toHaveBeenCalledWith("date", "asc");
  });

  test("sort dropdown opens and selects Guests", () => {
    renderUI();

    fireEvent.click(screen.getByTestId("sort-box"));
    fireEvent.click(screen.getByTestId("sort-item-guests"));

    expect(mockSort).toHaveBeenCalledWith("guests", "asc");
  });

  test("restaurant dropdown opens and selects BBQ Nation", () => {
    renderUI();

    fireEvent.click(screen.getByTestId("restaurant-box"));
    fireEvent.click(screen.getByText("BBQ Nation"));

    expect(mockFilter).toHaveBeenCalledWith(1);
  });

  test("selecting All Restaurants sends null", () => {
    renderUI();

    fireEvent.click(screen.getByTestId("restaurant-box"));
    fireEvent.click(screen.getAllByText("All Restaurants")[1]);

    expect(mockFilter).toHaveBeenCalledWith(null);
  });
});
