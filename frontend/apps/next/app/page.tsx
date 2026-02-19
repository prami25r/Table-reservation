"use client";
import * as React from "react";
import ReservationsScreen from "../../../src/screens/reservation/reservation";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const navigation = {
    navigate: (screen: string) => {
      if (screen === "NewReservation") router.push("/newreservation");
      else router.push("/");
    },
    replace: (_screen: string) => {},
    goBack: () => router.back(),
  };
  return <ReservationsScreen navigation={navigation} />;
}
