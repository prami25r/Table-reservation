import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Upcoming from "./upcoming";
import CheckedIn from "./checkedIn";
import Cancelled from "./cancelled";
import { COLORS } from "../themes/colors";
import { Plus } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const TABS = ["Upcoming", "Checked-In", "Cancelled"];

const ReservationsScreen = ({ navigation }: any) => {
  const [active, setActive] = useState("Upcoming");

  const renderScreen = () => {
    if (active === "Checked-In") return <CheckedIn />;
    if (active === "Cancelled") return <Cancelled />;
    return <Upcoming />;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.header}>My Reservations</Text>

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
};

export default ReservationsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 18,
    paddingBottom: 60,
    backgroundColor: COLORS.background,
  },
  header: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 18,
    color: COLORS.textPrimary,
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
    bottom: 25,
    right: 25,
    backgroundColor: COLORS.primaryButton,
    padding: 18,
    borderRadius: 50,
  },
});
