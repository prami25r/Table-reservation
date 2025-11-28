import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ChevronDown, ArrowUpDown } from "lucide-react-native";
import { COLORS } from "../themes/colors";

type SortType = "date" | "guests";
type SortOrder = "asc" | "desc";
type Restaurant = { id: number; name: string };

type Props = {
  onSort?: (type: SortType, order: SortOrder) => void;
  onFilterRestaurant?: (id: number | null) => void;
  restaurants?: Restaurant[];
  initial?: { type: SortType; order: SortOrder };
};

export default function SortFilterBar({
  onSort,
  onFilterRestaurant,
  restaurants = [],
  initial,
}: Props) {
  const [sortType, setSortType] = useState<SortType>(initial?.type ?? "date");
  const [order, setOrder] = useState<SortOrder>(initial?.order ?? "asc");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showRestaurantMenu, setShowRestaurantMenu] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  useEffect(() => {
    onSort?.(sortType, order);
  }, []);

  const toggleOrder = () => {
    const newOrder: SortOrder = order === "asc" ? "desc" : "asc";
    setOrder(newOrder);
    onSort?.(sortType, newOrder);
  };

  const selectSortType = (type: SortType) => {
    setSortType(type);
    onSort?.(type, order);
    setShowSortMenu(false);
  };

  const selectRestaurant = (r: Restaurant | null) => {
    setSelectedRestaurant(r);
    onFilterRestaurant?.(r ? r.id : null);
    setShowRestaurantMenu(false);
  };

  const sortLabel = showSortMenu
    ? "Sort"
    : sortType
    ? sortType === "date"
      ? "Date"
      : "Guests"
    : "Sort";

  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <TouchableOpacity onPress={toggleOrder} style={styles.orderToggle}>
          <ArrowUpDown size={18} color={COLORS.textPrimary} />
        </TouchableOpacity>

        <View style={styles.sortBoxWrapper}>
          <TouchableOpacity
            style={styles.sortBox}
            onPress={() => {
              setShowSortMenu((v) => !v);
              setShowRestaurantMenu(false);
            }}
          >
            <Text numberOfLines={1} style={styles.boxText}>
              {sortLabel === "Date" || sortLabel === "Guests" ? sortLabel : "Sort"}
            </Text>
            <ChevronDown size={16} color={COLORS.textSecondary} />
          </TouchableOpacity>

          {showSortMenu && (
            <View style={styles.dropdown}>
              <TouchableOpacity onPress={() => selectSortType("date")}>
                <Text style={styles.dropdownItem}>Date</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => selectSortType("guests")}>
                <Text style={styles.dropdownItem}>Guests</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.restaurantBoxWrapper}>
          <TouchableOpacity
            style={styles.box}
            onPress={() => {
              setShowRestaurantMenu((v) => !v);
              setShowSortMenu(false);
            }}
          >
            <Text numberOfLines={1} style={styles.boxText}>
              {selectedRestaurant ? selectedRestaurant.name : "All Restaurants"}
            </Text>
            <ChevronDown size={16} color={COLORS.textSecondary} />
          </TouchableOpacity>

          {showRestaurantMenu && (
            <View style={styles.dropdown}>
              <TouchableOpacity onPress={() => selectRestaurant(null)}>
                <Text style={styles.dropdownItem}>All Restaurants</Text>
              </TouchableOpacity>
              {restaurants.map((r) => (
                <TouchableOpacity key={r.id} onPress={() => selectRestaurant(r)}>
                  <Text style={styles.dropdownItem}>{r.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 12 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  orderToggle: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  sortBoxWrapper: {
    width: 120,
    position: "relative",
  },

  restaurantBoxWrapper: {
    flex: 1,
    position: "relative",
  },

  sortBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 8,
  },

  box: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 8,
  },

  boxText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },

  dropdown: {
    position: "absolute",
    top: 52,
    left: 0,
    right: 0,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    zIndex: 999,
  },

  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.textPrimary,
  },
});
