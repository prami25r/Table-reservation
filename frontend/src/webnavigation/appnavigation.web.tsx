import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootStackWeb from "./rootstackweb";

const WebNavigation = () => {
  return (
    <NavigationContainer>
      <RootStackWeb />
    </NavigationContainer>
  );
};

export default WebNavigation;
