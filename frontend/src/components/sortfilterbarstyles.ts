import { StyleSheet } from "react-native";
import { COLORS } from "../themes/colors";

export const styles = StyleSheet.create({
  wrapper: { marginBottom: 12,
    position:"relative",
    zIndex:9999
   },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  orderToggle: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  sortBoxWrapper: {
    width: 120,
    position: "relative",
  },

  restaurantBoxWrapper: {
    flex: 1,
    position: "relative",
  },

  sortBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 8,
  },

  box: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 8,
  },

  boxText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },

  dropdown: {
    position: "absolute",
    top: 52,
    left: 0,
    right: 0,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    zIndex: 999,
  },

  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.textPrimary,
  },
});