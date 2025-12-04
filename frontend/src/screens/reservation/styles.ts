import { StyleSheet, Platform } from "react-native";
import { COLORS } from "../../themes/colors";
import { useResponsive } from "../../utils/responsive";

export const useStyles = () => {
  const { isTablet, isDesktop } = useResponsive();

  const basePadding = isDesktop ? 30 : isTablet ? 24 : 20;
  const tabPadding = isDesktop ? 16 : isTablet ? 14 : 12;
  const fabSize = isDesktop ? 26 : isTablet ? 22 : 18;

  return StyleSheet.create({
    safeArea: {
      flex: 1,
      padding: basePadding,
      paddingBottom: isDesktop ? 20 : 10,
      paddingTop: Platform.OS === "ios" ? 10 : 1,
      backgroundColor: COLORS.background,

      // 🔥 FIX: Only center on Web. Mobile stays normal.
      alignItems: Platform.OS === "web" ? "center" : "flex-start",
    },

    contentWrapper: {
      // 🔥 FIX: Only apply width constraint on Web
      width: Platform.OS === "web" ? (isDesktop ? 1100 : isTablet ? 900 : "100%") : "100%",
      alignSelf: Platform.OS === "web" ? "center" : "flex-start",
      flex: 1, // ensures your lists render correctly on mobile
    },

    tabs: {
      flexDirection: "row",
      backgroundColor: COLORS.tabBackground,
      borderRadius: isDesktop ? 18 : 14,
      padding: isTablet ? 6 : 4,
      marginBottom: isDesktop ? 20 : 16,
      width: "100%", // ensures stretching on mobile
    },

    tab: {
      flex: 1,
      paddingVertical: tabPadding,
      borderRadius: isTablet ? 14 : 12,
    },

    activeTab: {
      backgroundColor: COLORS.tabActive,
    },

    tabText: {
      textAlign: "center",
      color: COLORS.textSecondary,
      fontWeight: "700",
      fontSize: isDesktop ? 18 : isTablet ? 16 : 14,
    },

    activeTabText: {
      color: COLORS.textPrimary,
      fontWeight: "700",
      fontSize: isDesktop ? 18 : isTablet ? 16 : 14,
    },

    fab: {
      position: "absolute",
      bottom: isDesktop ? 80 : isTablet ? 70 : 65,
      right: isDesktop ? 40 : 25,
      backgroundColor: COLORS.primaryButton,
      padding: fabSize,
      borderRadius: 50,
    },

    filterContainer: {
      marginTop: isDesktop ? 12 : 8,
      marginBottom: isDesktop ? 20 : 16,
      width: "100%", // ensures mobile layout consistency
    },
  });
};
