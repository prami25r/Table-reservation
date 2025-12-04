import { Platform, useWindowDimensions } from "react-native";

export const useResponsive = () => {
  const { width } = useWindowDimensions();

  const isTablet = width >= 768;
  const isDesktop = width >= 1024 && Platform.OS === "web";

  return {
    isPhone: !isTablet && !isDesktop,
    isTablet,
    isDesktop,
  };
};
