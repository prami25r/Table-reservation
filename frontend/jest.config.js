module.exports = {
  testEnvironment: "jsdom",

  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },

  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
    "\\.(png|jpg|jpeg|gif|svg)$": "<rootDir>/__mocks__/fileMock.js",

    "^react-native$": "<rootDir>/mocks/reactNativeMock.js",

    "@react-native-community/datetimepicker":
      "<rootDir>/mocks/datetimepicker.js",

    "react-native-gesture-handler":
      "<rootDir>/mocks/gesturehandler.js",

    "react-native-safe-area-context":
      "<rootDir>/mocks/safearea.js",

    "react-native-screens":
      "<rootDir>/mocks/nativescreen.js",

    "@react-navigation/native":
      "<rootDir>/mocks/navigation.web.js",

    "@react-navigation/native-stack":
      "<rootDir>/mocks/nativeStack.js",

    "lucide-react-native":
      "<rootDir>/mocks/lucide.js",
  },

  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  transformIgnorePatterns: [
    "node_modules/(?!(react-native" +
      "|@react-native" +
      "|react-native-reanimated" +
      "|lucide-react-native" +
      ")/)"
  ],

  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],

  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/index.ts",
    "!src/**/*.styles.ts",
    "!src/**/types.ts",
  ],
};
