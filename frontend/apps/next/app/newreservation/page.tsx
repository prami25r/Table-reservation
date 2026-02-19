"use client";
import * as React from "react";
import NewReservation from "../../../../src/screens/NewReservation/NewReservation";
import { useRouter } from "next/navigation";

export default function NewReservationPage() {
  const router = useRouter();
  const navigation = {
    navigate: (screen: string) => {
      if (screen === "Reservations") router.push("/");
      else router.push("/");
    },
    replace: (_screen: string) => {},
    goBack: () => router.push("/"),
  };
  const route = { params: {} };
  return <NewReservation navigation={navigation} route={route} />;
}
