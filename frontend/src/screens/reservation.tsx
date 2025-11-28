import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Upcoming from "./upcoming";
import CheckedIn from "./checkedIn";
import Cancelled from "./cancelled";
import SortFilterBar from "../components/sortfilterbar";
import { COLORS } from "../themes/colors";
import { Plus } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getRestaurants, getReservations } from "../api/reservation";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setReservations } from "../redux/slices/reservationslice";

const TABS = ["Upcoming", "Checked-In", "Cancelled"] as const;

export default function ReservationsScreen({ navigation }: any) {
  const dispatch = useAppDispatch();
  const reservations = useAppSelector((s) => s.reservation.list);

  const [active, setActive] = useState<string>("Upcoming");
  const [sortConfig, setSortConfig] = useState<{ type: "date" | "guests"; order: "asc" | "desc" }>({
    type: "date",
    order: "desc",
  });

  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [restaurantFilter, setRestaurantFilter] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await getRestaurants();
        setRestaurants(res.data || []);
      } catch (e) {
        setRestaurants([]);
      }
    })();
  }, []);

  // Load all reservations into Redux ***ADDED***
  useEffect(() => {
    (async () => {
      try {
        const res = await getReservations();
        dispatch(setReservations(res.data));
      } catch (err) {
        console.log("Reservation load error:", err);
      }
    })();
  }, []);

  const renderScreen = () => {
    if (active === "Checked-In")
      return (
        <CheckedIn
          data={reservations}
          sort={sortConfig}
          restaurantFilter={restaurantFilter}
        />
      );

    if (active === "Cancelled")
      return (
        <Cancelled
          data={reservations}
          sort={sortConfig}
          restaurantFilter={restaurantFilter}
        />
      );

    return (
      <Upcoming
        data={reservations}
        sort={sortConfig}
        restaurantFilter={restaurantFilter}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <SortFilterBar
        onSort={(t, o) => setSortConfig({ type: t, order: o })}
        onFilterRestaurant={(id) => setRestaurantFilter(id)}
        restaurants={restaurants}
        initial={sortConfig}
      />

      <View style={styles.tabs}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, active === tab && styles.activeTab]}
            onPress={() => setActive(tab)}
          >
            <Text style={[styles.tabText, active === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ flex: 1 }}>{renderScreen()}</View>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("NewReservation")}
      >
        <Plus color="#FFF" size={30} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 18,
    paddingBottom: 60,
    backgroundColor: COLORS.background,
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: COLORS.tabBackground,
    borderRadius: 14,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: COLORS.tabActive,
  },
  tabText: {
    textAlign: "center",
    color: COLORS.textSecondary,
    fontWeight: "600",
  },
  activeTabText: {
    color: COLORS.textPrimary,
    fontWeight: "700",
  },
  fab: {
    position: "absolute",
    bottom: 65,
    right: 25,
    backgroundColor: COLORS.primaryButton,
    padding: 18,
    borderRadius: 50,
  },
});
