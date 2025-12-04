import { StyleSheet, Platform } from "react-native";
import { COLORS } from "../../themes/colors";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBackground,
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,


    width: "100%",
    maxWidth: Platform.OS === "web" ? 900 : "100%",


    alignSelf: Platform.OS === "web" ? "center" : "stretch",
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: Platform.OS === "web" ? 20 : 20,
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
    fontSize: Platform.OS === "web" ? 14 : 13,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  locationText: {
    marginLeft: 6,
    color: COLORS.textSecondary,
    fontSize: Platform.OS === "web" ? 16 : 15,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
  },

  infoText: {
    marginLeft: 6,
    color: COLORS.textPrimary,
    fontSize: Platform.OS === "web" ? 16 : 15,
  },

  cancelButton: {
    backgroundColor: COLORS.badgeCancelled,
    padding: 15,
    borderRadius: 12,
    marginBottom: 16,
    marginHorizontal: 10,


    alignSelf: Platform.OS === "web" ? "center" : "stretch",
    width: "100%",
    maxWidth: Platform.OS === "web" ? 900 : "100%",
  },

  cancelText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "700",
    fontSize: Platform.OS === "web" ? 17 : 16,
  },
});
