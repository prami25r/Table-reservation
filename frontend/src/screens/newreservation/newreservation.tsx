import React from "react";
import { ScrollView } from "react-native";
import useNewreservation from "./hooks";
import NewReservationForm from "./newreservationform";
import { styles as formStyles } from "./styles";

export default function NewReservation({ navigation, route }: any) {
  const reservation = route?.params?.reservation || null;
  const form = useNewreservation(navigation, reservation);

  return (
    
      <ScrollView
        contentContainerStyle={formStyles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <NewReservationForm {...form} />
      </ScrollView>
    
  );
}
