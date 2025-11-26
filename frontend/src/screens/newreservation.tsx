import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useNewreservation from "./useNewreservation";
import NewReservationForm from "./newreservationform";
import { styles } from "./styles";

export default function NewReservation({ navigation }: any) {
  const form = useNewreservation(navigation, null);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        >
        <NewReservationForm {...form} />
      </ScrollView>
    </SafeAreaView>
  );
}
