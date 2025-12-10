import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Calendar, Clock, ChevronDown } from "lucide-react-native";
import { COLORS } from "../../themes/colors";
import { styles } from "./styles";

export default function NewReservationFormUI({
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
  setShowDatePicker,
  setShowTimePicker,

  guestCount,
  setGuestCount,

  specialRequests,
  setSpecialRequests,

  showRestaurantMenu,
  setShowRestaurantMenu,

  errors,

  handleSubmit,
  handleCancel,
  handleDateChange,
  handleTimeChange,
}: any) {
  const selectedRestaurantObj = restaurants.find((r: any) => r.id === restaurantId);

  return (
    <ScrollView>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Reserve Your Table</Text>
        <Text style={styles.sectionSubtitle}>
          Fill in the details below to make a reservation
        </Text>

        <Text style={styles.label}>Full Name *</Text>
        <TextInput
          style={[styles.input, errors.fullName && styles.errorBorder]}
          placeholder="Enter full name"
          placeholderTextColor={COLORS.textSecondary}
          value={fullName}
          onChangeText={setFullName}
        />


        <Text style={styles.label}>Mobile Number *</Text>
        <TextInput
          style={[styles.input, errors.mobileNumber && styles.errorBorder]}
          placeholder="Enter mobile number"
          placeholderTextColor={COLORS.textSecondary}
          keyboardType="phone-pad"
          value={mobileNumber}
          onChangeText={setMobileNumber}
        />

        <Text style={styles.label}>Email Address *</Text>
        <TextInput
          style={[styles.input, errors.email && styles.errorBorder]}
          placeholder="Enter email"
          placeholderTextColor={COLORS.textSecondary}
          value={email}
          onChangeText={setEmail}
        />


        <Text style={styles.label}>Restaurant *</Text>

        <View
          style={[
            styles.pickerContainer,
            errors.restaurantId && styles.errorBorder,
          ]}
        >
          <TouchableOpacity
            style={styles.inputRow}
            onPress={() => setShowRestaurantMenu((prev: any) => !prev)}
          >
            <Text
              numberOfLines={1}
              style={restaurantId ? styles.inputValue : styles.placeholder}
            >
              {selectedRestaurantObj?.name ?? "Select a restaurant"}
            </Text>
            <ChevronDown size={18} color={COLORS.textSecondary} />
          </TouchableOpacity>

          {showRestaurantMenu && (
            <View style={styles.dropdown}>
              {restaurants.map((r: any) => (
                <TouchableOpacity key={r.id} onPress={() => setRestaurantId(r.id)}>
                  <Text style={styles.dropdownItem}>{r.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

 
        <Text style={styles.label}>Date *</Text>
        <TouchableOpacity
          style={[styles.inputRow, errors.date && styles.errorBorder]}
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
          style={[styles.inputRow, errors.time && styles.errorBorder]}
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
          style={[styles.input, errors.guestCount && styles.errorBorder]}
          placeholder="Enter guest count"
          placeholderTextColor={COLORS.textSecondary}
          keyboardType="numeric"
          value={String(guestCount)}
          onChangeText={(v) => setGuestCount(Number(v))}
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
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.confirmButton} onPress={handleSubmit}>
            <Text style={styles.confirmText}>Confirm Reservation</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
