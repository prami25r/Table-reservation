import { StyleSheet, Platform } from "react-native";
import { COLORS } from "../../themes/colors";
import { useResponsive } from "../../utils/responsive";

export const useStyles = () => {
  const { isTablet, isDesktop } = useResponsive();

  const uniformPadding = 20;
  const tabPadding = isDesktop ? 16 : isTablet ? 14 : 12;
  const fabSize = isDesktop ? 26 : isTablet ? 22 : 18;

  const maxWidth = isDesktop ? 1100 : isTablet ? 900 : "100%";

  const webGridColumns = isDesktop
    ? "repeat(4, 1fr)"
    : isTablet
    ? "repeat(2, 1fr)"
    : "repeat(1, 1fr)";

  return StyleSheet.create({

    safeArea: {
      flex: 1,
      backgroundColor: COLORS.background,
      paddingTop: Platform.OS === "ios" ? uniformPadding + 4 : uniformPadding,
      position: "relative",
    },

    contentWrapper: {
      flex: 1,
      width: Platform.OS === "web" ? maxWidth : "100%",
      alignSelf: Platform.OS === "web" ? "center" : "stretch",
    },

    tabs: {
      flexDirection: "row",
      backgroundColor: COLORS.tabBackground,
      borderRadius: isDesktop ? 18 : 14,
      padding: isTablet ? 6 : 4,
      marginBottom: 16,
      width: "100%",
      paddingHorizontal:5,
      paddingVertical:5,
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
      backgroundColor: COLORS.primaryButton,
      padding: fabSize,
      borderRadius: 50,
      right: isTablet ? 40 : 24,
      bottom: isTablet ? 40 : 24,
    },

    webFab: {
  ...({
    position: "fixed",
  } as any),
  bottom: 40,
  right: 40,
  backgroundColor: COLORS.primaryButton,
  padding: 16,
  borderRadius: 50,
  boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
  zIndex: 9999,
},

    
    stickyHeader: {
      position: Platform.OS === "web" ? ("sticky" as any) : "relative",
      top: 0,
      zIndex: 999,
      backgroundColor: COLORS.background,
      paddingBottom: 8,
      width: "100%",
      paddingHorizontal: 25,
      paddingVertical: 10,
    },

    filterContainer: {
      marginTop: 8,
      marginBottom: 16,
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
