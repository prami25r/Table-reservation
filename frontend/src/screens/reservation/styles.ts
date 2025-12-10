import { StyleSheet, Platform } from "react-native";
import { COLORS } from "../../themes/colors";
import { useResponsive } from "../../utils/responsive";

export const useStyles = () => {
  const { isTablet, isDesktop } = useResponsive();

  const uniformPadding = 20;
  const tabPadding = isDesktop ? 16 : isTablet ? 14 : 12;
  const fabSize = isDesktop ? 26 : isTablet ? 22 : 18;
  const maxWidth = isDesktop ? 1100 : isTablet ? 900 : "100%";

  return StyleSheet.create({
   
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
      position: "relative",
    },

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

    content: {
      flex: 1,
      paddingHorizontal: 25,
      width: "100%",
    },

 
    tabs: {
      flexDirection: "row",
      backgroundColor: COLORS.tabBackground,
      borderRadius: isDesktop ? 18 : 14,
      padding: isTablet ? 6 : 4,
      marginBottom: 16,
      width: "100%",
      paddingHorizontal: 5,
      paddingVertical: 5,
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

    /** WEB FAB */
    webFab: {
      ...(Platform.OS === "web"
        ? ({
            position: "fixed",
          } as any)
        : {}),
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
  });
};
