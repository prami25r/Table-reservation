import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ChevronDown, ArrowUpDown, Filter } from "lucide-react-native";
import { COLORS } from "../themes/colors";

type Props = {
  onSort?: (type: "date" | "guests", order: "asc" | "desc") => void;
  initial?: { type: "date" | "guests"; order: "asc" | "desc" };
};

export default function SortFilterBar({ onSort, initial }: Props) {
  const [sortType, setSortType] = useState<"date" | "guests">(initial?.type ?? "date");
  const [order, setOrder] = useState<"asc" | "desc">(initial?.order ?? "desc");

  useEffect(() => {
    if (onSort) onSort(sortType, order);
  }, []);

  const toggleOrder = () => {
    const newOrder: "asc" | "desc" = order === "desc" ? "asc" : "desc";
    setOrder(newOrder);
    if (onSort) onSort(sortType, newOrder);
  };

  const changeSortType = () => {
    const newType: "date" | "guests" = sortType === "date" ? "guests" : "date";
    setSortType(newType);
    if (onSort) onSort(newType, order);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.box} onPress={changeSortType}>
        <ArrowUpDown size={16} color={COLORS.textPrimary} />
        <Text style={styles.boxText}>
          {sortType === "date" ? "Sort by Date" : "Sort by Guests"}
        </Text>
        <ChevronDown size={16} color={COLORS.textSecondary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.orderBox} onPress={toggleOrder}>
        <Filter size={16} color={COLORS.textPrimary} />
        <Text style={styles.boxText}>
          {order === "desc" ? "Descending" : "Ascending"}
        </Text>
        <ChevronDown size={16} color={COLORS.textSecondary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 18,
  },
  box: {
    flex: 1,
    backgroundColor: COLORS.cardBackground,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  orderBox: {
    flex: 1,
    backgroundColor: COLORS.cardBackground,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  boxText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textPrimary,
    fontWeight: "600",
  },
});
