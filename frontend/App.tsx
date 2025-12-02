import { Provider } from "react-redux";
import store from "./src/redux/store";
import React from "react";
// import AppNavigation from "./src/navigation/appnavigation";
import SortFilterBar from "./src/components/sortfilterbar"
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
    <Provider store={store}>
      <SortFilterBar />
    </Provider>
    </SafeAreaProvider>
  );
}
