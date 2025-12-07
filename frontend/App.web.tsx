import React from "react";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";

import store from "./src/redux/store";
import WebNavigation from "./src/webnavigation/appnavigation.web";
import RootStackWeb from "./src/webnavigation/rootstackweb";

export default function AppWeb() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <RootStackWeb />
      </Provider>
    </SafeAreaProvider>
  );
}
