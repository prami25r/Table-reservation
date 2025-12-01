import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Upcoming from "./upcoming";
import CheckedIn from "./checkedIn";
import Cancelled from "./cancelled";
import SortFilterBar from "../../components/sortfilterbar";
import { Plus } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getRestaurants, getReservations } from "../../api/reservation";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setReservations } from "../../redux/slices/reservationslice";
import { useFocusEffect } from "@react-navigation/native";
import { styles } from "./styles";

const TABS = ["Upcoming", "Checked-In", "Cancelled"] as const;

export default function ReservationsScreen({ navigation }: any) {
  const dispatch = useAppDispatch();
  const reservations = useAppSelector((s) => s.reservation.list);

 
  const [active, setActive] = useState("Upcoming");
  const [sortConfig, setSortConfig] = useState({
    type: "date" as "date" | "guests",
    order: "desc" as "asc" | "desc",
  });
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [restaurantFilter, setRestaurantFilter] = useState<number | null>(null);


  const loadRestaurants = useCallback(async () => {
    try {
      const res = await getRestaurants();
      setRestaurants(res.data || []);
    } catch {
      setRestaurants([]);
    }
  }, []);


  const loadReservations = useCallback(async () => {
    try {
      const res = await getReservations();
      dispatch(setReservations(res.data));
    } catch (err) {
      console.log("Reservation load error:", err);
    }
  }, [dispatch]);


  useEffect(() => {
    loadRestaurants();
  }, [loadRestaurants]);

  useEffect(() => {
    loadReservations();
  }, [loadReservations]);


  useFocusEffect(
    useCallback(() => {
      loadReservations();
    }, [loadReservations])
  );


  const renderScreen = () => {
    switch (active) {
      case "Checked-In":
        return (
          <CheckedIn
            data={reservations}
            sort={sortConfig}
            restaurantFilter={restaurantFilter}
          />
        );
      case "Cancelled":
        return (
          <Cancelled
            data={reservations}
            sort={sortConfig}
            restaurantFilter={restaurantFilter}
          />
        );
      default:
        return (
          <Upcoming
            data={reservations}
            sort={sortConfig}
            restaurantFilter={restaurantFilter}
          />
        );
    }
  };


  const handleSort = (t: "date" | "guests", o: "asc" | "desc") =>
    setSortConfig({ type: t, order: o });

  const handleFilter = (id: number | null) => setRestaurantFilter(id);

  return (
    <SafeAreaView style={styles.safeArea}>
      <SortFilterBar
        onSort={handleSort}
        onFilterRestaurant={handleFilter}
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
            <Text
              style={[styles.tabText, active === tab && styles.activeTabText]}
            >
              {tab}
            </Text>
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
