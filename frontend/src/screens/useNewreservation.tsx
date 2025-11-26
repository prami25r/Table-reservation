import { useState, useEffect } from "react";
import { getRestaurants, createReservation } from "../api/reservation";

export default function useNewreservation(navigation: any) {
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [restaurantId, setRestaurantId] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  const [restaurants, setRestaurants] = useState<any[]>([]);

  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    loadRestaurants();
  }, []);

  const loadRestaurants = async () => {
    try {
      const res = await getRestaurants();
      setRestaurants(res.data);
    } catch (e) {
      console.log("Failed loading restaurants", e);
    }
  };

  const save = async () => {
    if (!fullName || !mobileNumber || !restaurantId || !date || !time || !guestCount) {
      return;
    }

    const formattedDate = date.toISOString().split("T")[0];
    const formattedTime = time.toTimeString().slice(0, 5);

    await createReservation({
      fullName,
      mobileNumber,
      email,
      restaurantId,
      date: formattedDate,
      time: formattedTime,
      guestCount: Number(guestCount),
      specialRequests,
    });

    navigation.goBack();
  };

  return {
    fullName, setFullName,
    mobileNumber, setMobileNumber,
    email, setEmail,
    restaurantId, setRestaurantId,
    guestCount, setGuestCount,
    specialRequests, setSpecialRequests,
    restaurants,
    date, setDate,
    time, setTime,
    showDatePicker, setShowDatePicker,
    showTimePicker, setShowTimePicker,
    navigation,
    save,
  };
}
