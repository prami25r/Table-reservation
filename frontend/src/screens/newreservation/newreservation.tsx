import React from "react";
import { ScrollView } from "react-native";
import useNewReservation from "./hooks";
import { useNewReservationFormLogic } from "./logic";
import NewReservationFormUI from "./newreservationform";
import { styles as formStyles } from "./styles";

export default function NewReservation({ navigation, route }: any) {
  const reservation = route?.params?.reservation || null;
  const form = useNewReservation(navigation, reservation);
  const ui = useNewReservationFormLogic({ save: form.save });

  return (
    <ScrollView
      contentContainerStyle={formStyles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <NewReservationFormUI
     
        fullName={form.fullName}
        setFullName={form.setFullName}
        mobileNumber={form.mobileNumber}
        setMobileNumber={form.setMobileNumber}
        email={form.email}
        setEmail={form.setEmail}
        restaurantId={form.restaurantId}
        setRestaurantId={form.setRestaurantId}
        guestCount={form.guestCount}
        setGuestCount={form.setGuestCount}
        specialRequests={form.specialRequests}
        setSpecialRequests={form.setSpecialRequests}
        date={form.date}
        setDate={form.setDate}
        time={form.time}
        setTime={form.setTime}
        showDatePicker={form.showDatePicker}
        setShowDatePicker={form.setShowDatePicker}
        showTimePicker={form.showTimePicker}
        setShowTimePicker={form.setShowTimePicker}
        restaurants={form.restaurants}
        errors={ui.errors}
        showRestaurantMenu={ui.showRestaurantMenu}
        setShowRestaurantMenu={ui.setShowRestaurantMenu}
        handleSubmit={ui.handleSubmit}
        handleCancel={ui.handleCancel}
        handleDateChange={ui.handleDateChange}
        handleTimeChange={ui.handleTimeChange}
      />
    </ScrollView>
  );
}
