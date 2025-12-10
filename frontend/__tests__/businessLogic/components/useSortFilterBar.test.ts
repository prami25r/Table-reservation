import { renderHook, act } from "@testing-library/react";
import useSortFilterBar, {
  Restaurant,
  SortOrder,
  SortType,
} from "../../../src/components/usefilteLogic";

describe("useSortFilterBar Hook", () => {
  const restaurants: Restaurant[] = [
    { id: 1, name: "A" },
    { id: 2, name: "B" },
  ];

  const mockOnSort = jest.fn();
  const mockOnFilter = jest.fn();

  const setup = (props = {}) =>
    renderHook(() =>
      useSortFilterBar({
        onSort: mockOnSort,
        onFilterRestaurant: mockOnFilter,
        restaurants,
        ...props,
      })
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("initial state defaults", () => {
    const { result } = setup();

    expect(result.current.sortType).toBe("date");
    expect(result.current.order).toBe("asc");

  
    expect(mockOnSort).toHaveBeenCalledWith("date", "asc");
  });

  test("initial props override defaults", () => {
    const { result } = setup({
      initial: { type: "guests" as SortType, order: "desc" as SortOrder },
    });

    expect(result.current.sortType).toBe("guests");
    expect(result.current.order).toBe("desc");
  });

  test("toggleOrder switches asc ↔ desc and triggers onSort()", () => {
    const { result } = setup();

    act(() => {
      result.current.toggleOrder();
    });

    expect(result.current.order).toBe("desc");
    expect(mockOnSort).toHaveBeenLastCalledWith("date", "desc");

    act(() => {
      result.current.toggleOrder(); 
    });

    expect(result.current.order).toBe("asc");
    expect(mockOnSort).toHaveBeenLastCalledWith("date", "asc");
  });

  test("toggleSortMenu toggles visibility and closes restaurant menu", () => {
    const { result } = setup();

    act(() => result.current.toggleRestaurantMenu()); 
    expect(result.current.showRestaurantMenu).toBe(true);

    act(() => result.current.toggleSortMenu());
    expect(result.current.showSortMenu).toBe(true);
    expect(result.current.showRestaurantMenu).toBe(false);
  });

  test("toggleRestaurantMenu toggles visibility and closes sort menu", () => {
    const { result } = setup();

    act(() => result.current.toggleSortMenu());
    expect(result.current.showSortMenu).toBe(true);

    act(() => result.current.toggleRestaurantMenu());
    expect(result.current.showRestaurantMenu).toBe(true);
    expect(result.current.showSortMenu).toBe(false);
  });

  test("selectSortType updates type, calls onSort, closes menu", () => {
    const { result } = setup();

    act(() => result.current.selectSortType("guests"));

    expect(result.current.sortType).toBe("guests");
    expect(mockOnSort).toHaveBeenLastCalledWith("guests", "asc");
    expect(result.current.showSortMenu).toBe(false);
  });

  test("selectRestaurant updates state, triggers onFilterRestaurant, closes menu", () => {
    const { result } = setup();

    act(() => result.current.selectRestaurant(restaurants[1]));

    expect(result.current.selectedRestaurant).toEqual(restaurants[1]);
    expect(mockOnFilter).toHaveBeenCalledWith(2);
    expect(result.current.showRestaurantMenu).toBe(false);
  });

  test("selectRestaurant(null) resets filter", () => {
    const { result } = setup();

    act(() => result.current.selectRestaurant(null));

    expect(result.current.selectedRestaurant).toBe(null);
    expect(mockOnFilter).toHaveBeenCalledWith(null);
  });

  test("sortLabel updates based on state", () => {
    const { result } = setup();


    expect(result.current.sortLabel).toBe("Date");

 
    act(() => result.current.selectSortType("guests"));
    expect(result.current.sortLabel).toBe("Guests");

    
    act(() => result.current.toggleSortMenu());
    expect(result.current.sortLabel).toBe("Sort");
  });
});
