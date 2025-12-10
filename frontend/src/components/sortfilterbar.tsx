import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ChevronDown, ArrowUpDown } from "lucide-react-native";
import { COLORS } from "../themes/colors";
import { styles } from "./sortfilterbarstyles";

import useSortFilterBar, {
  SortType,
  SortOrder,
  Restaurant,
  UseSortFilterBarProps,
} from "./usefilteLogic";

export default function SortFilterBar(props: UseSortFilterBarProps) {
  const {
    sortLabel,
    restaurants,
    selectedRestaurant,
    showSortMenu,
    showRestaurantMenu,

    toggleOrder,
    toggleSortMenu,
    toggleRestaurantMenu,
    selectSortType,
    selectRestaurant,
  } = useSortFilterBar(props);

  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>

        <TouchableOpacity style={styles.orderToggle} onPress={toggleOrder}>
          <ArrowUpDown size={18} color={COLORS.textPrimary} />
        </TouchableOpacity>

        <View style={styles.sortBoxWrapper}>
          <TouchableOpacity style={styles.sortBox} onPress={toggleSortMenu}>
            <Text numberOfLines={1} style={styles.boxText}>{sortLabel}</Text>
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
          <TouchableOpacity style={styles.box} onPress={toggleRestaurantMenu}>
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
