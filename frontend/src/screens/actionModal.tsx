import React from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { COLORS } from "../themes/colors";

export default function ActionModal({
  visible,
  status,
  onClose,
  onUpdate,
  onCancel,
}: any) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableOpacity style={styles.overlay} onPress={onClose} />

      <View style={styles.container}>
        <Text style={styles.title}>Are you sure to cancel the reservation?</Text>

        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.btn,
              styles.updateBtn,
              status === "Checked-In" && { backgroundColor: COLORS.badgeCheckedIn },
              status === "Cancelled" && { backgroundColor: "#d1d1d1" },
            ]}
            onPress={onUpdate}
          >
            <Text
              style={[
                styles.updateText,
                status === "Checked-In" && { color: "#FFF" },
              ]}
            >
              Update
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.btn,
              styles.cancelBtn,
              status === "Cancelled" && { opacity: 0.6 },
            ]}
            onPress={onCancel}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#00000066",
  },
  container: {
    backgroundColor: "#FFF",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 20,
    color: COLORS.textPrimary,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 6,
  },
  updateBtn: {
    backgroundColor: "#E2E2E2",
  },
  cancelBtn: {
    backgroundColor: COLORS.badgeCancelled,
  },
  updateText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  cancelText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFF",
  },
});
