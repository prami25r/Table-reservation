import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text } from "react-native";
import useNewReservation from "./useNewreservation";
import NewReservationForm from "./newreservationform";
import { styles } from "./styles";

const NewReservation = ({ navigation, route }: any) => {
  const reservation = route?.params?.reservation || null;
  const form = useNewReservation(navigation, reservation);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>
          {reservation ? "Update Reservation" : "New Reservation"}
        </Text>

        <NewReservationForm {...form} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewReservation;
