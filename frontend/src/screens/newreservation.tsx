import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import useNewreservation from "./useNewreservation";
import NewReservationForm from "./newreservationform";
import { styles } from "./styles";
import { COLORS } from "../themes/colors";

export default function NewReservation({ navigation }: any) {
  const form = useNewreservation(navigation, null);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerRow}>
  <TouchableOpacity onPress={() => navigation.goBack()}>
    <ArrowLeft size={26} color={COLORS.textPrimary} />
  </TouchableOpacity>

  <Text style={styles.headerTitle}>New Reservation</Text>

  <View style={{ width: 26 }} />
</View>


      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <NewReservationForm {...form} />
      </ScrollView>
    </SafeAreaView>
  );
}
