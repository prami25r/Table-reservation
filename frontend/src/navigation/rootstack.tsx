import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/splashscreen";
import ReservationsScreen from "../screens/reservation";
import NewReservation from "../screens/newreservation";
import { StyleSheet } from "react-native";

const Stack = createNativeStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "left",
        headerShadowVisible: false,
        headerTitleStyle: {
          fontSize: 24,
          fontWeight: "700",
        },
      }}
    >
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Reservations"
        component={ReservationsScreen}
        options={{ title: "My Reservations" }}
      />

      <Stack.Screen
        name="NewReservation"
        component={NewReservation}
        options={{
          title: "New Reservation",
          headerTitleStyle: styles.newReservationTitle,
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  newReservationTitle: {
    fontSize: 24,
    fontWeight: "700",
  },
});
