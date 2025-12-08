import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import Upcoming from "./upcoming";
import CheckedIn from "./checkedIn";
import Cancelled from "./cancelled";
import SortFilterBar from "../../components/sortfilterbar";
import WebLayout from "../../components/webCard/webLayout";
import WebSortSidebar from "../../components/webCard/webSortsidebar";
import { Plus } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getRestaurants, getReservations } from "../../api/reservation";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setReservations } from "../../redux/slices/reservationslice";

import { useStyles } from "./styles";
import { useResponsive } from "../../utils/responsive"; 

const TABS = ["Upcoming", "Checked-In", "Cancelled"] as const;

export default function ReservationsScreen({ navigation }: any) {
  const dispatch = useAppDispatch();
  const reservations = useAppSelector((s) => s.reservation.list);
  const styles = useStyles();

  const { isPhone, isTablet, isDesktop } = useResponsive();

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
    loadReservations();
  }, [loadRestaurants, loadReservations]);

  const renderScreen = () => {
    const props = {
      data: reservations,
      sort: sortConfig,
      restaurantFilter,
    };

    switch (active) {
      case "Checked-In":
        return <CheckedIn {...props} />;
      case "Cancelled":
        return <Cancelled {...props} />;
      default:
        return <Upcoming {...props} />;
    }
  };

  const handleSort = (type: "date" | "guests", order: "asc" | "desc") =>
    setSortConfig({ type, order });

  const handleFilter = (id: number | null) => setRestaurantFilter(id);


  if (Platform.OS === "web" && isDesktop) {
    return (
      <WebLayout
        sidebar={
          <WebSortSidebar
            onSort={handleSort}
            onFilterRestaurant={handleFilter}
            restaurants={restaurants}
            initial={sortConfig}
          />
        }
        fab={
          <TouchableOpacity
            style={[styles.webFab, { bottom: isTablet ? 40 : 30 }]} 
            onPress={() => navigation.navigate("NewReservation")}
          >
            <Plus color="#FFF" size={24} />
          </TouchableOpacity>
        }
      >
        <SafeAreaView style={[styles.safeArea, { paddingHorizontal: isTablet ? 24 : 16 }]}>
          <View style={styles.contentWrapper}>
            <View style={[styles.tabs, { marginBottom: isTablet ? 14 : 10}]}>
              {TABS.map((tab) => (
                <TouchableOpacity
                  key={tab}
                  style={[styles.tab, active === tab && styles.activeTab]}
                  onPress={() => setActive(tab)}
                >
                  <Text
                    style={[
                      styles.tabText,
                      active === tab && styles.activeTabText,
                      { fontSize: isTablet ? 17 : 15 },
                    ]}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={{ flex: 1,paddingHorizontal:25}}>{renderScreen()}</View>
          </View>
        </SafeAreaView>
      </WebLayout>
    );
  }

  
  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { paddingHorizontal: isTablet ? 22 : 12 }, 
      ]}
    >
      <View style={styles.contentWrapper}>
        <View style={styles.stickyHeader}>
          <SortFilterBar
            onSort={handleSort}
            onFilterRestaurant={handleFilter}
            restaurants={restaurants}
            initial={sortConfig}
          />

          <View style={[styles.tabs, { marginTop: isTablet ? 12 : 8}]}>
            {TABS.map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, active === tab && styles.activeTab]}
                onPress={() => setActive(tab)}
              >
                <Text
                  style={[
                    styles.tabText,
                    active === tab && styles.activeTabText,
                    { fontSize: isTablet ? 16 : 14 },
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{ flex: 1 , paddingHorizontal:25}}>{renderScreen()}</View>
      </View>

      <TouchableOpacity
        style={[
          styles.fab,
          {
            bottom: isTablet ? 40 : 24,
            right: isTablet ? 40 : 24,
          },
        ]}
        onPress={() => navigation.navigate("NewReservation")}
      >
        <Plus color="#FFF" size={30} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
