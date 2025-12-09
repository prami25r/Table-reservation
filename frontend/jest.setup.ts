import "@testing-library/jest-native/extend-expect";
import "@testing-library/jest-dom";


(global as any).__DEV__ = true;
(global as any).__reanimatedWorkletInit = () => {};


const suppressed = [
  "react-test-renderer is deprecated",
  "React does not recognize the",
  "Unknown event handler property",
  "useLayoutEffect does nothing on the server",
];

const originalError = console.error;
console.error = (...args: any[]) => {
  const msg = args.join(" ");
  if (suppressed.some(w => msg.includes(w))) return;
  originalError(...args);
};

const originalWarn = console.warn;
console.warn = (...args: any[]) => {
  const msg = args.join(" ");
  if (suppressed.some(w => msg.includes(w))) return;
  originalWarn(...args);
};


afterEach(() => {
  jest.clearAllMocks();
});
