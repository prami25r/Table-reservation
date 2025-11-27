import { useState, useEffect } from "react";
import { getRestaurants, createReservation, updateReservation } from "../api/reservation";

export default function useNewreservation(navigation: any, reservation: any) {
  const [fullName, setFullName] = useState(reservation?.customer?.fullName || "");
  const [mobileNumber, setMobileNumber] = useState(reservation?.customer?.mobileNumber || "");
  const [email, setEmail] = useState(reservation?.customer?.email || "");
  const [restaurantId, setRestaurantId] = useState(reservation?.restaurantId || "");
  const [guestCount, setGuestCount] = useState(reservation?.guestCount?.toString() || "");
  const [specialRequests, setSpecialRequests] = useState(reservation?.specialRequests || "");

  const [restaurants, setRestaurants] = useState([]);

  const initialDate = reservation ? new Date(reservation.reservationDate) : new Date();
  const [date, setDate] = useState(initialDate);
  const [time, setTime] = useState(initialDate);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getRestaurants();
      setRestaurants(res.data);
    })();
  }, []);

  const save = async () => {
  if (reservation) {
    await updateReservation(reservation.id, {
      reservationDate: new Date(
        date.toISOString().split("T")[0] + "T" + time.toTimeString().slice(0,5) + ":00"
      ).toISOString(),
      guestCount: Number(guestCount),
      specialRequests
    });
  } else {
    await createReservation({
      customerId: 1,
      restaurantId: Number(restaurantId),
      reservationDate: new Date(
        date.toISOString().split("T")[0] + "T" + time.toTimeString().slice(0,5) + ":00"
      ).toISOString(),
      guestCount: Number(guestCount),
      specialRequests,
      tableIds: []
    });
  }

  navigation.navigate("Reservations");
};


  return {
    fullName,
    setFullName,
    mobileNumber,
    setMobileNumber,
    email,
    setEmail,
    restaurantId,
    setRestaurantId,
    restaurants,
    guestCount,
    setGuestCount,
    specialRequests,
    setSpecialRequests,
    date,
    setDate,
    time,
    setTime,
    showDatePicker,
    setShowDatePicker,
    showTimePicker,
    setShowTimePicker,
    save,
    navigation,
  };
}
