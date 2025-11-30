import { StyleSheet } from "react-native";
import { COLORS } from "../../themes/colors";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 20,
    paddingBottom: 10,
    paddingTop: 1,
    backgroundColor: COLORS.background,
  },

  tabs: {
    flexDirection: "row",
    backgroundColor: COLORS.tabBackground,
    borderRadius: 14,
    padding: 4,
    marginBottom: 16,
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
    fontWeight: "700",
  },

  activeTabText: {
    color: COLORS.textPrimary,
    fontWeight: "700",
  },

  fab: {
    position: "absolute",
    bottom: 65,
    right: 25,
    backgroundColor: COLORS.primaryButton,
    padding: 18,
    borderRadius: 50,
  },

  filterContainer: {
    marginTop: 8,
    marginBottom: 16,
  },
});
