import { StyleSheet, Platform } from "react-native";
import { COLORS } from "../../themes/colors";
import { useResponsive } from "../../utils/responsive";

export const useStyles = () => {
  const { isTablet, isDesktop } = useResponsive();

  const basePadding = isDesktop ? 30 : isTablet ? 24 : 20;
  const tabPadding = isDesktop ? 16 : isTablet ? 14 : 12;
  const fabSize = isDesktop ? 26 : isTablet ? 22 : 18;

  // Responsive columns for web grid (if/when you use it)
  const webGridColumns = isDesktop
    ? "repeat(4, 1fr)"
    : isTablet
    ? "repeat(2, 1fr)"
    : "repeat(1, 1fr)";

  return StyleSheet.create({
    safeArea: {
      flex: 1,
      padding: basePadding,
      paddingBottom: isDesktop ? 20 : 10,
      paddingTop: Platform.OS === "ios" ? 10 : 1,
      backgroundColor: COLORS.background,

      // Tablets should center like desktop; phones stretch
      alignItems:
        Platform.OS === "web"
          ? "center"
          : isTablet
          ? "center"
          : "stretch",
    },

    // ✅ This was missing – screen is using styles.contentWrapper
    contentWrapper: {
      width: isDesktop ? 1100 : isTablet ? 900 : "100%",
      alignSelf:
        Platform.OS === "web" || isTablet ? "center" : "flex-start",
      flex: 1,
    },

    tabs: {
      flexDirection: "row",
      backgroundColor: COLORS.tabBackground,
      borderRadius: isDesktop ? 18 : 14,
      padding: isTablet ? 6 : 4,
      marginBottom: isDesktop ? 20 : 16,
      width: "100%",
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
      width: "100%",
    },

    listContainer: {
      flex: 1,
      width: "100%",
    },

    listWrapper: {
      width: "100%",
      flexDirection: "column",
    },

    // Optional responsive grid for web – safe with `as any`
    grid: {
      width: "100%",
      ...(Platform.OS === "web"
        ? ({
            display: "grid",
            gridTemplateColumns: webGridColumns,
            columnGap: 20,
            rowGap: 20,
          } as any)
        : {}),
    },
  });
};
