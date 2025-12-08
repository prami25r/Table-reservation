import React, { useState, useMemo } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { ArrowUpDown, Search } from "lucide-react-native";
import { COLORS } from "../../themes/colors";

interface WebSortSidebarProps {
  onSort: (t: "date" | "guests", o: "asc" | "desc") => void;
  onFilterRestaurant: (id: number | null) => void;
  restaurants: any[];
  initial: {
    type: "date" | "guests";
    order: "asc" | "desc";
  };
}

export default function WebSortSidebar({
  onSort,
  onFilterRestaurant,
  restaurants,
  initial,
}: WebSortSidebarProps) {
  const [search, setSearch] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return restaurants;
    return restaurants.filter((r) =>
      r.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, restaurants]);

  if (Platform.OS !== "web") return null;

  return (
    <View style={styles.stickyWrapper}>
      <View style={styles.mainCard}>
        <Text style={styles.heading}>Filters</Text>

       
        <View style={styles.sectionCard}>
          <Text style={styles.sectionLabel}>Sort By</Text>

          <View style={styles.row}>
          
            <TouchableOpacity
              style={[
                styles.chip,
                initial.type === "guests" && styles.activeChip,
              ]}
              onPress={() => onSort("guests", initial.order)}
            >
              <Text
                style={[
                  styles.chipText,
                  initial.type === "guests" && styles.activeChipText,
                ]}
              >
                Guests
              </Text>
            </TouchableOpacity>

          
            <TouchableOpacity
              style={[
                styles.chip,
                initial.type === "date" && styles.activeChip,
              ]}
              onPress={() => onSort("date", initial.order)}
            >
              <Text
                style={[
                  styles.chipText,
                  initial.type === "date" && styles.activeChipText,
                ]}
              >
                Date
              </Text>
            </TouchableOpacity>

          
            <TouchableOpacity
              style={[
                styles.iconButton,
                initial.order === "asc" && styles.activeIconButton,
              ]}
              onPress={() =>
                onSort(initial.type, initial.order === "asc" ? "desc" : "asc")
              }
            >
              <ArrowUpDown
                size={18}
                color={
                  initial.order === "asc"
                    ? COLORS.textPrimary
                    : COLORS.textSecondary
                }
              />
            </TouchableOpacity>
          </View>
        </View>

        
        <View style={[styles.sectionCard, { marginTop: 14 }]}>
          <Text style={styles.sectionLabel}>Restaurants</Text>

         
          <View style={styles.searchWrapper}>
  <Search
    size={20}
    color={COLORS.textPrimary}
    style={{ marginRight: 10 }}
  />

  <input
    placeholder="Search restaurants..."
    value={search}
    onChange={(e) =>
      setSearch((e.target as HTMLInputElement).value)
    }
    style={stylesWeb.searchInput}
  />
</View>


          <View style={styles.filterColumn}>
        
            {restaurants.length > 0 && (
              <TouchableOpacity
                style={[
                  styles.chip,
                  selectedRestaurant === null && styles.activeChip,
                ]}
                onPress={() => {
                  setSelectedRestaurant(null);
                  onFilterRestaurant(null);
                }}
              >
                <Text
                  style={[
                    styles.chipText,
                    selectedRestaurant === null && styles.activeChipText,
                  ]}
                >
                  All Restaurants
                </Text>
              </TouchableOpacity>
            )}

           
            {filtered.length === 0 && (
              <Text style={styles.noData}>restaurants not found</Text>
            )}

            
            {filtered.slice(0, 20).map((r) => (
              <TouchableOpacity
                key={r.id}
                style={[
                  styles.chip,
                  selectedRestaurant === r.id && styles.activeChip,
                ]}
                onPress={() => {
                  setSelectedRestaurant(r.id);
                  onFilterRestaurant(r.id);
                }}
              >
                <Text
                  style={[
                    styles.chipText,
                    selectedRestaurant === r.id && styles.activeChipText,
                  ]}
                >
                  {r.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stickyWrapper: {
    position: "sticky" as any,
    top: 20,
    alignSelf: "flex-start",
  },

  mainCard: {
    backgroundColor: COLORS.cardBackground,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    width: 260,
  },

  heading: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    color: COLORS.textPrimary,
  },

  sectionCard: {
    backgroundColor: COLORS.tabBackground,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: 6,
  },

  sectionLabel: {
    fontWeight: "700",
    fontSize: 15,
    color: COLORS.textPrimary,
    marginBottom: 8,
  },

  row: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },

  chip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  activeChip: {
    backgroundColor: COLORS.tabActive,
    borderColor: COLORS.tabActive,
  },

  chipText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },

  activeChipText: {
    color: COLORS.textPrimary,
    fontWeight: "700",
  },

  iconButton: {
    padding: 8,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  activeIconButton: {
    backgroundColor: COLORS.tabActive,
    borderColor: COLORS.tabActive,
  },

  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    height: 44,
    borderRadius: 10,
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
  },

  filterColumn: {
    flexDirection: "column",
    gap: 8,
  },

  noData: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginTop: 6,
  },
});

const stylesWeb = {
  searchInput: {
    flex: 1,
    border: "none",
    outline: "none",
    background: "transparen",
    fontSize: 14,
    color: COLORS.textPrimary,
  } as React.CSSProperties,
};
