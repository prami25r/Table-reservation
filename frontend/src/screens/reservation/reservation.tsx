import React from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import Upcoming from "./upcoming";
import CheckedIn from "./checkedIn";
import Cancelled from "./cancelled";
import SortFilterBar from "../../components/sortfilterbar";
import WebLayout from "../../components/webCard/webLayout";
import WebSortSidebar from "../../components/webCard/webSortsidebar";
import { Plus } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useResponsive } from "../../utils/responsive";
import { useStyles } from "./styles";
import { useReservationsLogic } from "./useReservationhooks";

const TABS = ["Upcoming", "Checked-In", "Cancelled"] as const;

export default function ReservationsScreen({ navigation }: any) {
  const styles = useStyles();
  const { isTablet, isDesktop } = useResponsive();

  const {
    reservations,
    active,
    setActive,
    sortConfig,
    restaurants,
    restaurantFilter,
    handleSort,
    handleFilter,
  } = useReservationsLogic();


  const renderScreen = () => {
    const props = { data: reservations, sort: sortConfig, restaurantFilter };

    switch (active) {
      case "Checked-In":
        return <CheckedIn {...props} />;
      case "Cancelled":
        return <Cancelled {...props} />;
      default:
        return <Upcoming {...props} />;
    }
  };


  const FabButton = (
    <TouchableOpacity
      style={
        Platform.OS === "web"
          ? [styles.webFab, { position: "fixed" }]
          : styles.fab
      }
      onPress={() => navigation.navigate("NewReservation")}
    >
      <Plus color="#FFF" size={Platform.OS === "web" ? 24 : 30} />
    </TouchableOpacity>
  );

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
        fab={FabButton}
      >
        <SafeAreaView
          style={[
            styles.safeArea,
            { paddingHorizontal: isTablet ? 24 : 16 },
          ]}
        >
          <View style={styles.contentWrapper}>
            
            <View
              style={[
                styles.tabs,
                { marginBottom: isTablet ? 14 : 10 },
              ]}
            >
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
                    ]}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

           
            <View style={styles.content}>{renderScreen()}</View>
          </View>
        </SafeAreaView>
      </WebLayout>
    );
  }


  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentWrapper}>
     
          <View style={styles.stickyHeader}>
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
                    style={[
                      styles.tabText,
                      active === tab && styles.activeTabText,
                    ]}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          
          <View style={styles.content}>{renderScreen()}</View>
        </View>
      </SafeAreaView>

      {FabButton}
    </View>
  );
}
