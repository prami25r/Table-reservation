import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Filter } from "lucide-react-native";

import UpcomingList from "../screens/upcoming";
import CheckedInList from "../screens/checkedIn";
import CancelledList from "../screens/cancelled";

const TABS = ["Upcoming", "Checked-In", "Cancelled"];

const ReservationsScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("Upcoming");

  const renderContent = () => {
    switch (activeTab) {
      case "Checked-In":
        return <CheckedInList />;
      case "Cancelled":
        return <CancelledList />;
      default:
        return <UpcomingList navigation={navigation} />;
    }
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.title}>My Reservations</Text>
        <TouchableOpacity>
          <Filter size={24} />
        </TouchableOpacity>
      </View>

      
      <View style={styles.tabsContainer}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ flex: 1 }}>{renderContent()}</View>

      <TouchableOpacity
        style={styles.newReservationBtn}
        onPress={() => navigation.navigate("NewReservation")}
      >
        <Text style={styles.newReservationText}>Make New Reservation</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReservationsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16
  },

  title: {
    fontSize: 22,
    fontWeight: "700"
  },

  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  },

  tabButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#EAEAEA",
    borderRadius: 8,
    marginHorizontal: 4
  },

  activeTab: {
    backgroundColor: "#000"
  },

  tabText: {
    textAlign: "center",
    color: "#333",
    fontWeight: "600"
  },

  activeTabText: {
    color: "#fff"
  },

  newReservationBtn: {
    backgroundColor: "#000",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 10
  },

  newReservationText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600"
  }
});
