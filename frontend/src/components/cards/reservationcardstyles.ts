import { StyleSheet } from "react-native";
import { COLORS } from "../../themes/colors";

export const styles = StyleSheet.create({
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
  cancelButton: {
    backgroundColor: COLORS.badgeCancelled,
    padding: 15,
    borderRadius: 12,
    marginBottom: 16,
    marginHorizontal: 10,
  },
  cancelText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
});
