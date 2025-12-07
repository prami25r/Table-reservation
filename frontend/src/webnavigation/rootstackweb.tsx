import React, { useState, useEffect } from "react";

// your screens
import SplashScreen from "../screens/splashscreen";
import ReservationsScreen from "../screens/reservation/reservation";
import NewReservation from "../screens/newreservation/newreservation";
import { registerWebNavigation } from "../../mocks/navigation.web";

export default function RootStackWeb() {
  const [screen, setScreen] = useState("Splash");

  // mimic splash navigation
 useEffect(() => {
    registerWebNavigation((target: string) => {
      setScreen(target);
    });
  }, []);

  const goTo = (name: string) => setScreen(name);

  // pass navigation-like object to screens
  const navigation = {
    navigate: goTo,
    replace: goTo,
    goBack: () => setScreen("Reservations")
  };

  // render screen manually
  switch (screen) {
    // case "Splash":
    //     return <SplashScreen/>;

    case "Reservations":
      return <ReservationsScreen navigation={navigation} />;

    case "NewReservation":
       return <NewReservation navigation={navigation} />;

     default:
      return <ReservationsScreen navigation={navigation} />;
  }
}
