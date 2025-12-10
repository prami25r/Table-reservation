import { useState } from "react";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

export const useNewReservationFormLogic = ({
  save,
}: {
  save: () => Promise<void>;
}) => {
  const navigation = useNavigation<any>();


  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [restaurantId, setRestaurantId] = useState<number | null>(null);
  const [guestCount, setGuestCount] = useState<number>(0);
  const [specialRequests, setSpecialRequests] = useState("");

  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);


  const [errors, setErrors] = useState<any>({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showRestaurantMenu, setShowRestaurantMenu] = useState(false);

 
  const validate = () => {
    const e: any = {};

    if (!fullName.trim()) e.fullName = true;
    if (!mobileNumber.trim()) e.mobileNumber = true;
    if (!email.trim()) e.email = true;
    if (!restaurantId) e.restaurantId = true;
    if (!date) e.date = true;
    if (!time) e.time = true;
    if (!guestCount) e.guestCount = true;

    setErrors(e);

    if (Object.keys(e).length > 0) {
      Toast.show({
        type: "error",
        text1: "Missing required fields",
        text2: "Please fill all mandatory details",
      });
      return false;
    }

    return true;
  };


  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      await save();
      navigation.navigate("Reservations");
    } catch {
      Toast.show({
        type: "error",
        text1: "No available tables",
        text2: "This restaurant has reached max reservations",
      });
    }
  };


  const handleCancel = () => {
    navigation.navigate("Reservations");
  };


  const handleDateChange = (_: any, selected: Date | undefined) => {
    setShowDatePicker(false);
    if (selected) setDate(selected);
  };

  const handleTimeChange = (_: any, selected: Date | undefined) => {
    setShowTimePicker(false);
    if (selected) setTime(selected);
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

    date,
    setDate,

    time,
    setTime,

    guestCount,
    setGuestCount,

    specialRequests,
    setSpecialRequests,

    showDatePicker,
    setShowDatePicker,

    showTimePicker,
    setShowTimePicker,

    showRestaurantMenu,
    setShowRestaurantMenu,

    errors,

  
    handleSubmit,
    handleCancel,
    handleDateChange,
    handleTimeChange,
  };
};
