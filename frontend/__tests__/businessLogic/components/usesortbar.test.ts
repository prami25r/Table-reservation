import { renderHook, act } from "@testing-library/react-native";
import useSortFilterBar, {
  Restaurant,
  SortType,
  SortOrder,
} from "../../../src/components/usefilteLogic";

describe("useSortFilterBar", () => {
  const onSort = jest.fn();
  const onFilterRestaurant = jest.fn();

  const restaurants: Restaurant[] = [
    { id: 1, name: "Alpha" },
    { id: 2, name: "Bravo" },
  ];

  const setup = (initial?: { type: SortType; order: SortOrder }) =>
    renderHook(() =>
      useSortFilterBar({
        onSort,
        onFilterRestaurant,
        restaurants,
        initial,
      })
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // -------------------------------------------------------------------------
  it("initializes with default values", () => {
    const { result } = setup();

    const { sortType, order, showSortMenu, showRestaurantMenu, selectedRestaurant } =
      result.current;

    expect(sortType).toBe("date");
    expect(order).toBe("asc");
    expect(showSortMenu).toBe(false);
    expect(showRestaurantMenu).toBe(false);
    expect(selectedRestaurant).toBe(null);

    expect(onSort).toHaveBeenCalledWith("date", "asc");
  });

  // -------------------------------------------------------------------------
  it("respects initial values", () => {
    const { result } = setup({ type: "guests", order: "desc" });

    expect(result.current.sortType).toBe("guests");
    expect(result.current.order).toBe("desc");

    expect(onSort).toHaveBeenCalledWith("guests", "desc");
  });

  // -------------------------------------------------------------------------
  it("toggles sort order correctly", () => {
    const { result } = setup();

    act(() => result.current.toggleOrder());

    expect(result.current.order).toBe("desc");
    expect(onSort).toHaveBeenLastCalledWith("date", "desc");

    act(() => result.current.toggleOrder());

    expect(result.current.order).toBe("asc");
    expect(onSort).toHaveBeenLastCalledWith("date", "asc");
  });

  // -------------------------------------------------------------------------
  it("toggles sort dropdown menu", () => {
    const { result } = setup();

    act(() => result.current.toggleSortMenu());
    expect(result.current.showSortMenu).toBe(true);
    expect(result.current.showRestaurantMenu).toBe(false);

    act(() => result.current.toggleSortMenu());
    expect(result.current.showSortMenu).toBe(false);
  });

  // -------------------------------------------------------------------------
  it("toggles restaurant dropdown menu", () => {
    const { result } = setup();

    act(() => result.current.toggleRestaurantMenu());
    expect(result.current.showRestaurantMenu).toBe(true);
    expect(result.current.showSortMenu).toBe(false);

    act(() => result.current.toggleRestaurantMenu());
    expect(result.current.showRestaurantMenu).toBe(false);
  });

  // -------------------------------------------------------------------------
  it("selects sort type correctly", () => {
    const { result } = setup();

    act(() => result.current.selectSortType("guests"));

    expect(result.current.sortType).toBe("guests");
    expect(onSort).toHaveBeenLastCalledWith("guests", "asc");
    expect(result.current.showSortMenu).toBe(false);
  });

  // -------------------------------------------------------------------------
  it("selects restaurant correctly", () => {
    const { result } = setup();

    const r = restaurants[1];

    act(() => result.current.selectRestaurant(r));

    expect(result.current.selectedRestaurant).toEqual(r);
    expect(onFilterRestaurant).toHaveBeenLastCalledWith(r.id);
    expect(result.current.showRestaurantMenu).toBe(false);
  });

  // -------------------------------------------------------------------------
  it("clears restaurant when selecting null", () => {
    const { result } = setup();

    act(() => result.current.selectRestaurant(null));

    expect(result.current.selectedRestaurant).toBe(null);
    expect(onFilterRestaurant).toHaveBeenLastCalledWith(null);
  });

  // -------------------------------------------------------------------------
  it("computes sort label correctly", () => {
    const { result } = setup();

    // default = date
    expect(result.current.sortLabel).toBe("Date");

    act(() => result.current.selectSortType("guests"));
    expect(result.current.sortLabel).toBe("Guests");

    act(() => result.current.toggleSortMenu());
    expect(result.current.sortLabel).toBe("Sort");
  });
});

