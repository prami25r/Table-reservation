import { useState, useEffect, useCallback } from "react";
import { getRestaurants, createReservation, updateReservation } from "../../api/reservation";

export default function useNewReservation(navigation: any, reservation: any) {
  const [fullName, setFullName] = useState(reservation?.customer?.fullName || "");
  const [mobileNumber, setMobileNumber] = useState(reservation?.customer?.mobileNumber || "");
  const [email, setEmail] = useState(reservation?.customer?.email || "");
  const [restaurantId, setRestaurantId] = useState(reservation?.restaurantId || "");
  const [guestCount, setGuestCount] = useState(
    reservation?.guestCount?.toString() || ""
  );
  const [specialRequests, setSpecialRequests] = useState(
    reservation?.specialRequests || ""
  );

  const [restaurants, setRestaurants] = useState([]);

  const initialDate = reservation
    ? new Date(reservation.reservationDate)
    : new Date();

  const [date, setDate] = useState(initialDate);
  const [time, setTime] = useState(initialDate);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const fetchRestaurants = useCallback(async () => {
    try {
      const res = await getRestaurants();
      setRestaurants(res.data || []);
    } catch {
      setRestaurants([]);
    }
  }, []);

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  const save = useCallback(async () => {
    const mergedDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes(),
      0,
      0
    );

    const payload = {
      fullName,
      mobileNumber,
      email,
      restaurantId: Number(restaurantId),
      reservationDate: mergedDate,
      guestCount: Number(guestCount),
      specialRequests,
    };

    try {
      if (reservation) {
        await updateReservation(reservation.id, {
          reservationDate: mergedDate,
          guestCount: Number(guestCount),
          specialRequests,
        });
      } else {
        await createReservation(payload);
      }

      navigation.navigate("Reservations");
    } catch (err) {
      console.log("Save error:", err);
    }
  }, [
    fullName,
    mobileNumber,
    email,
    restaurantId,
    guestCount,
    specialRequests,
    date,
    time,
    navigation,
    reservation,
  ]);

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
  };
}
