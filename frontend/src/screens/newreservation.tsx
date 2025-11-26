import React from "react";
import { ScrollView } from "react-native";
import NewReservationForm from "./newreservationform";
import useNewreservation from "./useNewreservation";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NewReservation({ navigation }: any) {
  const form = useNewreservation(navigation);   

  return (
    <SafeAreaView>
    <ScrollView>
      <NewReservationForm {...form} />          
    </ScrollView>
    </SafeAreaView>
  );
}
