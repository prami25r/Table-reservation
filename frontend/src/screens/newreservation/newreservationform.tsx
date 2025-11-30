import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Calendar, Clock } from "lucide-react-native";
import Toast from "react-native-toast-message";
import { COLORS } from "../../themes/colors";
import { styles } from "../styles";


export default function NewReservationForm({
  fullName,
  setFullName,
  mobileNumber,
  setMobileNumber,
  email,
  setEmail,
  restaurantId,
  setRestaurantId,
  restaurants,
  date,
  time,
  showDatePicker,
  showTimePicker,
  setDate,
  setTime,
  setShowDatePicker,
  setShowTimePicker,
  guestCount,
  setGuestCount,
  specialRequests,
  setSpecialRequests,
  save,
  navigation,
}: any) {
  const [errors, setErrors] = React.useState<any>({});

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
  
  const handleDateChange = (_: any, selectedDate: Date | undefined) => {
  setShowDatePicker(false);
  if (selectedDate) setDate(selectedDate);
};

const handleTimeChange = (_: any, selectedTime: Date | undefined) => {
  setShowTimePicker(false);
  if (selectedTime) setTime(selectedTime);
};
 
  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      await save();
      navigation.navigate("Reservations");
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "No available tables",
        text2: "This restaurant has reached max reservations",
      });
    }
  };

  return (
    <ScrollView>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Reserve Your Table</Text>
        <Text style={styles.sectionSubtitle}>
          Fill in the details below to make a reservation
        </Text>

     
        <Text style={styles.label}>Full Name *</Text>
        <TextInput
          style={[styles.input, errors.fullName && { borderColor: "red" }]}
          placeholder="Enter full name"
          placeholderTextColor={COLORS.textSecondary}
          value={fullName}
          onChangeText={setFullName}
        />

      
        <Text style={styles.label}>Mobile Number *</Text>
        <TextInput
          style={[styles.input, errors.mobileNumber && { borderColor: "red" }]}
          placeholder="Enter mobile number"
          placeholderTextColor={COLORS.textSecondary}
          keyboardType="phone-pad"
          value={mobileNumber}
          onChangeText={setMobileNumber}
        />

      
        <Text style={styles.label}>Email Address *</Text>
        <TextInput
          style={[styles.input, errors.email && { borderColor: "red" }]}
          placeholder="Enter email"
          placeholderTextColor={COLORS.textSecondary}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Restaurant *</Text>
        <View
          style={[
            styles.pickerContainer,
            errors.restaurantId && { borderColor: "red", borderWidth: 1 },
          ]}
        >
          <Picker
            selectedValue={restaurantId}
            onValueChange={setRestaurantId}
            style={[styles.picker, { color: COLORS.textPrimary }]}
          >
            <Picker.Item label="Select a restaurant" value="" />
            {restaurants.map((r: any) => (
              <Picker.Item key={r.id} label={r.name} value={r.id} />
            ))}
          </Picker>
        </View>

      
        <Text style={styles.label}>Date *</Text>
        <TouchableOpacity
          style={[
            styles.inputRow,
            errors.date && { borderColor: "red", borderWidth: 1 },
          ]}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={date ? styles.inputValue : styles.placeholder}>
            {date ? date.toLocaleDateString() : "Select date"}
          </Text>
          <Calendar size={20} color={COLORS.textSecondary} />
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={date || new Date()}
            mode="date"
            onChange={handleDateChange}
          />
        )}

      
        <Text style={styles.label}>Time *</Text>
        <TouchableOpacity
          style={[
            styles.inputRow,
            errors.time && { borderColor: "red", borderWidth: 1 },
          ]}
          onPress={() => setShowTimePicker(true)}
        >
          <Text style={time ? styles.inputValue : styles.placeholder}>
            {time
              ? time.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Select time"}
          </Text>
          <Clock size={20} color={COLORS.textSecondary} />
        </TouchableOpacity>

        {showTimePicker && (
          <DateTimePicker
            value={time || new Date()}
            mode="time"
            onChange={handleTimeChange}
          />
        )}

      
        <Text style={styles.label}>Number of Guests *</Text>
        <TextInput
          style={[styles.input, errors.guestCount && { borderColor: "red" }]}
          placeholder="Enter guest count"
          placeholderTextColor={COLORS.textSecondary}
          keyboardType="numeric"
          value={String(guestCount)}
          onChangeText={setGuestCount}
        />

       
        <Text style={styles.label}>Special Requests</Text>
        <TextInput
          style={[styles.input, styles.specialInput]}
          placeholder="Any special notes..."
          placeholderTextColor={COLORS.textSecondary}
          multiline
          value={specialRequests}
          onChangeText={setSpecialRequests}
        />

        
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleSubmit}
          >
            <Text style={styles.confirmText}>Confirm Reservation</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}