import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ChevronDown, ArrowUpDown } from "lucide-react-native";
import { COLORS } from "../themes/colors";
import { styles } from "./sortfilterbarstyles";

type SortType = "date" | "guests";
type SortOrder = "asc" | "desc";

type Restaurant = {
  id: number;
  name: string;
};

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
  }, [sortType, order]);


  const toggleOrder = useCallback(() => {
    const newOrder: SortOrder = order === "asc" ? "desc" : "asc";
    setOrder(newOrder);
    onSort?.(sortType, newOrder);
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

 
  const sortLabel =
    showSortMenu ? "Sort" : sortType === "date" ? "Date" : "Guests";

  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        
        <TouchableOpacity onPress={toggleOrder} style={styles.orderToggle}>
          <ArrowUpDown size={18} color={COLORS.textPrimary} />
        </TouchableOpacity>

      
        <View style={styles.sortBoxWrapper}>
          <TouchableOpacity style={styles.sortBox} onPress={toggleSortMenu}>
            <Text numberOfLines={1} style={styles.boxText}>
              {sortLabel}
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

              {restaurants.map(({ id, name }) => (
                <TouchableOpacity
                  key={id}
                  onPress={() => selectRestaurant({ id, name })}
                >
                  <Text style={styles.dropdownItem}>{name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>
    </View>
  );
}