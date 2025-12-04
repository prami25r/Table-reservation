import { StyleSheet, Platform } from "react-native";
import { COLORS } from "../themes/colors";

export const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12,
    zIndex: Platform.OS === "web" ? 20 : 1,     
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    zIndex: Platform.OS === "web" ? 20 : 1,
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
    zIndex: Platform.OS === "web" ? 999 : 1,    
  },

  restaurantBoxWrapper: {
    flex: 1,
    position: "relative",
    zIndex: Platform.OS === "web" ? 999 : 1,
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
    fontSize: Platform.OS === "web" ? 15 : 16, 
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
    zIndex: Platform.OS === "web" ? 9999 : 99, 
    elevation: 10,                           
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },

  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: Platform.OS === "web" ? 15 : 16,
    fontWeight: "500",
    color: COLORS.textPrimary,
  },
});
