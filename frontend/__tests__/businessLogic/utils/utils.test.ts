// tests/utils/utils.test.ts

jest.mock("../../../src/utils/date", () =>
  jest.requireActual("../../../src/utils/date")
);

import { BREAKPOINTS } from "../../../src/utils/breakpoint";
import { formatDate, formatTime } from "../../../src/utils/date";
import { useResponsive, useScreenSize } from "../../../src/utils/responsive";
import { Platform, useWindowDimensions } from "react-native";

// ---------- MOCKS ----------
jest.mock("react-native", () => {
  const actual = jest.requireActual("react-native");
  return {
    ...actual,
    useWindowDimensions: jest.fn(),
    Platform: { OS: "web" },
  };
});

const mockDimensions = (width: number) => {
  (useWindowDimensions as jest.Mock).mockReturnValue({
    width,
    height: 800,
  });
};

// ---------- BREAKPOINT TESTS ----------
describe("BREAKPOINTS", () => {
  it("should match the defined constant values", () => {
    expect(BREAKPOINTS).toEqual({
      PHONE: 0,
      TABLET: 768,
      DESKTOP: 1024,
      LARGE_DESKTOP: 1440,
    });
  });

  it("should be deeply immutable", () => {
    expect(Object.isFrozen(BREAKPOINTS)).toBe(true);
  });
});

// ---------- DATE UTILS TESTS ----------
describe("date utilities", () => {
  const iso = "2024-12-01T10:25:30Z";

  it("should format the date correctly", () => {
    expect(formatDate(iso)).toBe("2024-12-01");
  });

  it("should format the time correctly", () => {
    expect(formatTime(iso)).toBe("10:25");
  });

  it("should not crash on invalid ISO strings", () => {
    expect(() => formatDate("bad-input")).not.toThrow();
    expect(() => formatTime("bad-input")).not.toThrow();
  });
});

// ---------- RESPONSIVE HOOKS TESTS ----------
describe("useResponsive hook", () => {
  it("returns desktop on web when width >= 1024", () => {
    Platform.OS = "web";
    mockDimensions(1200);

    expect(useResponsive()).toEqual({
      isPhone: false,
      isTablet: false,
      isDesktop: true,
    });
  });

  it("returns tablet when width between 768 and 1023", () => {
    Platform.OS = "ios";
    mockDimensions(800);

    const { isPhone, isTablet, isDesktop } = useResponsive();

    expect(isTablet).toBe(true);
    expect(isPhone).toBe(false);
    expect(isDesktop).toBe(false);
  });

  it("returns phone when width < 768", () => {
    Platform.OS = "android";
    mockDimensions(400);

    expect(useResponsive()).toEqual({
      isPhone: true,
      isTablet: false,
      isDesktop: false,
    });
  });
});

// ---------- SCREEN SIZE TESTS ----------
describe("useScreenSize hook", () => {
  it("returns xs when width < 360", () => {
    mockDimensions(320);
    expect(useScreenSize()).toBe("xs");
  });

  it("returns sm when width < 768", () => {
    mockDimensions(600);
    expect(useScreenSize()).toBe("sm");
  });

  it("returns md when width < 1024", () => {
    mockDimensions(900);
    expect(useScreenSize()).toBe("md");
  });

  it("returns lg when width < 1440", () => {
    mockDimensions(1200);
    expect(useScreenSize()).toBe("lg");
  });

  it("returns xl when width >= 1440", () => {
    mockDimensions(1600);
    expect(useScreenSize()).toBe("xl");
  });
});
