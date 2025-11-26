import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Calendar, Clock, Users, MapPin } from "lucide-react-native";
import { COLORS } from "../../themes/colors";

type Props = {
  restaurantName: string;
  restaurantLocation: string;
  date: string;
  time: string;
  guests: number;
  status: string;
  onUpdate?: () => void;
  onCancel?: () => void;
  onCheckIn?: () => void;
};

export default function ReservationCard({
  restaurantName,
  restaurantLocation,
  date,
  time,
  guests,
  status,
  onUpdate,
  onCancel,
  onCheckIn,
}: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onUpdate}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{restaurantName}</Text>

        <View
          style={[
            styles.badge,
            status === "Upcoming" && { backgroundColor: COLORS.badgeUpcoming },
            status === "Checked-In" && { backgroundColor: COLORS.badgeCheckedIn },
            status === "Cancelled" && { backgroundColor: COLORS.badgeCancelled },
          ]}
        >
          <Text style={styles.badgeText}>{status}</Text>
        </View>
      </View>

      <View style={styles.locationRow}>
        <MapPin size={17} color={COLORS.textSecondary} />
        <Text style={styles.locationText}>{restaurantLocation}</Text>
      </View>

      <View style={styles.infoRow}>
        <Calendar size={18} color={COLORS.textSecondary} />
        <Text style={styles.infoText}>{date}</Text>

        <Clock size={18} color={COLORS.textSecondary} style={{ marginLeft: 20 }} />
        <Text style={styles.infoText}>{time}</Text>

        <Users size={18} color={COLORS.textSecondary} style={{ marginLeft: 20 }} />
        <Text style={styles.infoText}>{guests} guests</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBackground,
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 16,
  },
  badgeText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 13,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  locationText: {
    marginLeft: 6,
    color: COLORS.textSecondary,
    fontSize: 15,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
  },
  infoText: {
    marginLeft: 6,
    color: COLORS.textPrimary,
    fontSize: 15,
  },
});
