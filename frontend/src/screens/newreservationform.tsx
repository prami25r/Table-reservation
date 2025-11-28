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
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS } from "../themes/colors";
import { styles } from "./styles";

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
  return (
    <ScrollView>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Reserve Your Table</Text>
        <Text style={styles.sectionSubtitle}>
          Fill in the details below to make a reservation
        </Text>


        <Text style={styles.label}>Full Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter full name"
          placeholderTextColor={COLORS.textSecondary}
          value={fullName}
          onChangeText={setFullName}
        />


        <Text style={styles.label}>Mobile Number *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter mobile number"
          placeholderTextColor={COLORS.textSecondary}
          keyboardType="phone-pad"
          value={mobileNumber}
          onChangeText={setMobileNumber}
        />


        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          placeholderTextColor={COLORS.textSecondary}
          value={email}
          onChangeText={setEmail}
        />


        <Text style={styles.label}>Restaurant *</Text>
        <View style={styles.pickerContainer}>
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
          style={styles.inputRow}
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
            onChange={(_, d) => {
              setShowDatePicker(false);
              if (d) setDate(d);
            }}
          />
        )}


        <Text style={styles.label}>Time *</Text>
        <TouchableOpacity
          style={styles.inputRow}
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
            onChange={(_, t) => {
              setShowTimePicker(false);
              if (t) setTime(t);
            }}
          />
        )}


        <Text style={styles.label}>Number of Guests *</Text>
        <TextInput
          style={styles.input}
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
            onPress={async () => {
              await save();
              navigation.navigate("Reservations");
            }}
          >
            <Text style={styles.confirmText}>Confirm Reservation</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
}
