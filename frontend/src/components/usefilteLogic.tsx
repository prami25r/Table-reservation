import { useState, useEffect, useCallback } from "react";

export type SortType = "date" | "guests";
export type SortOrder = "asc" | "desc";

export type Restaurant = {
  id: number;
  name: string;
};

export type UseSortFilterBarProps = {
  onSort?: (type: SortType, order: SortOrder) => void;
  onFilterRestaurant?: (id: number | null) => void;
  restaurants?: Restaurant[];
  initial?: {
    type: SortType;
    order: SortOrder;
  };
};

export default function useSortFilterBar({
  onSort,
  onFilterRestaurant,
  restaurants = [],
  initial,
}: UseSortFilterBarProps) {
  const [sortType, setSortType] = useState<SortType>(initial?.type ?? "date");
  const [order, setOrder] = useState<SortOrder>(initial?.order ?? "asc");

  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showRestaurantMenu, setShowRestaurantMenu] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  useEffect(() => {
    onSort?.(sortType, order);
  }, [sortType, order]);

  const toggleOrder = useCallback(() => {
    const next = order === "asc" ? "desc" : "asc";
    setOrder(next);
    onSort?.(sortType, next);
  }, [order, sortType, onSort]);

  const toggleSortMenu = useCallback(() => {
    setShowSortMenu((prev) => !prev);
    setShowRestaurantMenu(false);
  }, []);

  const toggleRestaurantMenu = useCallback(() => {
    setShowRestaurantMenu((prev) => !prev);
    setShowSortMenu(false);
  }, []);

  const selectSortType = useCallback(
    (type: SortType) => {
      setSortType(type);
      onSort?.(type, order);
      setShowSortMenu(false);
    },
    [order, onSort]
  );

  const selectRestaurant = useCallback(
    (r: Restaurant | null) => {
      setSelectedRestaurant(r);
      onFilterRestaurant?.(r ? r.id : null);
      setShowRestaurantMenu(false);
    },
    [onFilterRestaurant]
  );

  const sortLabel = showSortMenu
    ? "Sort"
    : sortType === "date"
    ? "Date"
    : "Guests";

  return {
    sortType,
    order,
    showSortMenu,
    showRestaurantMenu,
    restaurants,
    selectedRestaurant,
    sortLabel,

    toggleOrder,
    toggleSortMenu,
    toggleRestaurantMenu,
    selectSortType,
    selectRestaurant,
  };
}
