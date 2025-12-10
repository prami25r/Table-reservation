
require("@testing-library/jest-native/extend-expect");
require("@testing-library/jest-dom");

jest.mock("react-native-toast-message", () => {
  const toastMock = { show: jest.fn(), hide: jest.fn() };
  return { __esModule: true, default: toastMock, ...toastMock };
});

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(() => ({ navigate: jest.fn() })),
  NavigationContainer: ({ children }) => children,
}));

const suppressedWarnings = [
  "react-test-renderer is deprecated",
  "React does not recognize the",
  "Unknown event handler property",
  "useLayoutEffect does nothing on the server",
];

const originalError = console.error;
console.error = (...args) => {
  const message = args?.[0] || "";
  if (suppressedWarnings.some((w) => message.includes(w))) return;
  originalError(...args);
};

const originalWarn = console.warn;
console.warn = (...args) => {
  const message = args?.[0] || "";
  if (suppressedWarnings.some((w) => message.includes(w))) return;
  originalWarn(...args);
};


afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  jest.restoreAllMocks();
});
