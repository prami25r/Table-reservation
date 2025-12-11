module.exports = {
  testEnvironment: "jsdom",

  
  testMatch: [
    "<rootDir>/__tests__/**/*.test.(ts|tsx|js|jsx)",
    "<rootDir>/tests/**/*.test.(ts|tsx|js|jsx)",
    "<rootDir>/src/**/*.test.(ts|tsx|js|jsx)",
  ],

  collectCoverageFrom: [
    "src/api/**/*.{ts,tsx,js,jsx}",
    "src/redux/**/*.{ts,tsx,js,jsx}",
    "src/redux/slices/**/*.{ts,tsx,js,jsx}",
    "src/screens/reservation/useReservationhooks.tsx",
    "src/screens/reservation/upcoming.tsx",
    "src/screens/reservation/cancelled.tsx",
    "src/screens/reservation/checkedIn.tsx",
    "src/screens/newreservation/hooks.tsx",
    "src/screens/newreservation/logic.tsx",
    "src/components/usefilterLogic.tsx",
    "src/screens/newreservation/newreservation.tsx",
    "src/utils/breakpoint.ts",
    "src/utils/date.ts",
    "src/utils/responsive.ts",
  ],

  transform: {
    "^.+\\.[jt]sx?$": [
      "babel-jest",
      { presets: ["module:@react-native/babel-preset"] },
    ],
  },

  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(png|jpg|jpeg|gif|svg)$": "<rootDir>/jest/fileMock.js",
    "^@jest/test-sequencer$": "<rootDir>/jest/testSequencerMock.js",
    "^react-native$": "<rootDir>/mocks/reactNativeMock.js",
    "^react-native/Libraries/Animated/NativeAnimatedHelper$": "<rootDir>/mocks/animated.js",
  },

  transformIgnorePatterns: [
    "node_modules/(?!(react-native"
      + "|@react-native"
      + "|@react-navigation"
      + "|react-native-reanimated"
      + ")/)",
  ],

  setupFiles: ["<rootDir>/jest.globals.js"],

  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  watchman: false,

  testSequencer: "<rootDir>/jest/testSequencerMock.js",

  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};
