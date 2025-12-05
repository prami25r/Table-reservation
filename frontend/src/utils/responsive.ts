import { useWindowDimensions, Platform } from "react-native";
import { BREAKPOINTS } from "./breakpoint";

export const useResponsive = () => {
  const { width } = useWindowDimensions();

  const isDesktop = Platform.OS === "web" && width >= BREAKPOINTS.DESKTOP;
  const isTablet = width >= BREAKPOINTS.TABLET && width < BREAKPOINTS.DESKTOP;
  const isPhone = width < BREAKPOINTS.TABLET;

  return { isPhone, isTablet, isDesktop };
};
export const useScreenSize = () => {
  const { width } = useWindowDimensions();

  if (width < 360) return "xs";      
  if (width < 768) return "sm";   
  if (width < 1024) return "md";     
  if (width < 1440) return "lg";     
  return "xl";                     
};
