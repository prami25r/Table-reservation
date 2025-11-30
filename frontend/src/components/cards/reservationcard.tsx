import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Calendar, Clock, Users, MapPin } from "lucide-react-native";
import { COLORS } from "../../themes/colors";
import { styles } from "./reservationcardstyles";

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
  const [expanded, setExpanded] = useState(false);

  return (
    <View>
      <TouchableOpacity style={styles.card} onPress={() => setExpanded(!expanded)}>
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

      {expanded && status === "Upcoming" && (
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelText}>Cancel Reservation</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
