import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Platform } from "react-native";
import WebSortSidebar from "../../../src/components/webCard/webSortsidebar";

describe("WebSortSidebar (web)", () => {
  const mockSort = jest.fn();
  const mockFilter = jest.fn();

  const restaurants = [
    { id: 1, name: "BBQ Nation" },
    { id: 2, name: "A2B" },
    { id: 3, name: "Mainland China" },
  ];

  const initial = { type: "date", order: "asc" } as const;

  const renderUI = () => {
    Platform.OS = "web"; // force web mode
    return render(
      <WebSortSidebar
        onSort={mockSort}
        onFilterRestaurant={mockFilter}
        restaurants={restaurants}
        initial={initial}
      />
    );
  };

  beforeEach(() => jest.clearAllMocks());

  test("renders Filters, Sort By, and Restaurants sections", () => {
    renderUI();

    expect(screen.getByText("Filters")).toBeTruthy();
    expect(screen.getByText("Sort By")).toBeTruthy();
    expect(screen.getByText("Restaurants")).toBeTruthy();
  });

  // SORT TESTS
  test("clicking Guests triggers onSort('guests', 'asc')", () => {
    renderUI();
    fireEvent.click(screen.getByText("Guests"));
    expect(mockSort).toHaveBeenCalledWith("guests", "asc");
  });

  test("clicking Date triggers onSort('date', 'asc')", () => {
    renderUI();
    fireEvent.click(screen.getByText("Date"));
    expect(mockSort).toHaveBeenCalledWith("date", "asc");
  });

  test("toggle sort order ASC → DESC → ASC", () => {
    const ui = renderUI();

    // find all <div role="button"> equivalents
    const buttons = ui.container.querySelectorAll("div,button");

    // find the last TouchableOpacity (icon toggle) by text or structure
    const toggleBtn = buttons[buttons.length - 1];

    fireEvent.click(toggleBtn);
    expect(mockSort).toHaveBeenCalledWith("date", "desc");

    fireEvent.click(toggleBtn);
    expect(mockSort).toHaveBeenCalledWith("date", "asc");
  });

  // SEARCH
  test("filters restaurants via search", () => {
    renderUI();
    const search = screen.getByPlaceholderText("Search restaurants...");

    fireEvent.change(search, { target: { value: "bbq" } });

    expect(screen.getByText("BBQ Nation")).toBeTruthy();
    expect(screen.queryByText("A2B")).toBeNull();
  });

  test("shows 'restaurants not found' if no results", () => {
    renderUI();
    const search = screen.getByPlaceholderText("Search restaurants...");
    fireEvent.change(search, { target: { value: "zzzzz" } });

    expect(screen.getByText("restaurants not found")).toBeTruthy();
  });

  // FILTER
  test("clicking restaurant triggers onFilterRestaurant(id)", () => {
    renderUI();
    fireEvent.click(screen.getByText("A2B"));
    expect(mockFilter).toHaveBeenCalledWith(2);
  });

  test("clicking All Restaurants triggers null filter", () => {
    renderUI();
    fireEvent.click(screen.getByText("All Restaurants"));
    expect(mockFilter).toHaveBeenCalledWith(null);
  });

  // NON-WEB RETURN NULL
  test("does not render on iOS", () => {
    Platform.OS = "ios";

    const ui = render(
      <WebSortSidebar
        onSort={mockSort}
        onFilterRestaurant={mockFilter}
        restaurants={restaurants}
        initial={initial}
      />
    );

    expect(ui.container.firstChild).toBeNull();
  });
});
