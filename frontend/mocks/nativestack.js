export const createNativeStackNavigator = () => {
  return {
    Navigator: ({ children }) => children,
    Screen: ({ children }) => children,
  };
};
