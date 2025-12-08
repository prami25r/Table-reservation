export const SafeAreaProvider = ({ children }) => children;
export const SafeAreaView = ({ children }) => children;

export const useSafeAreaInsets = () => ({
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
});


export const initialWindowMetrics = null;

export const SafeAreaInsetsContext = {
  Provider: ({ children }) => children,
  Consumer: ({ children }) => children({ top: 0, bottom: 0, left: 0, right: 0 }),
};

export const SafeAreaFrameContext = {
  Provider: ({ children }) => children,
  Consumer: ({ children }) => children({ width: 0, height: 0 }),
};

export const useSafeAreaFrame = () => ({
  x: 0,
  y: 0,
  width: 0,
  height: 0,
});
