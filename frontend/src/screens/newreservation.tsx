import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useNewreservation from "./useNewreservation";
import NewReservationForm from "./newreservationform";
import { COLORS } from "../themes/colors";
import { styles as formStyles } from "./styles";

export default function NewReservation({ navigation, route }: any) {
  const reservation = route?.params?.reservation || null;
  const form = useNewreservation(navigation, reservation);

  return (
    // <SafeAreaView style={{ flex: 1, backgroundColor: "red" }}>
      <ScrollView
        contentContainerStyle={formStyles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <NewReservationForm {...form} />
      </ScrollView>
    // </SafeAreaView>
  );
}
