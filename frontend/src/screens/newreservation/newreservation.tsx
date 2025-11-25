import { useEffect, useState } from "react";
import { View, ScrollView, Modal, TouchableOpacity, Text } from "react-native";
import { getCustomers } from "../../api/customer";
import { getRestaurants } from "../../api/restaurant";
import { getTablesByRestaurant } from "../../api/table";
import { createReservation } from "../../api/reservation";
import AppInput from "../../components/inputs/appinput";
import AppDropdown from "../../components/inputs/appdropdown";
import AppDatePicker from "../../components/inputs/appdatepicker";
import AppTimePicker from "../../components/inputs/apptimepicker";
import PrimaryButton from "../../components/buttons/primarybutton";
import styles from "./newreservationstyles";

export default function NewReservation() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [tables, setTables] = useState<any[]>([]);

  const [customerId, setCustomerId] = useState<string>("");
  const [restaurantId, setRestaurantId] = useState<string>("");
  const [tableId, setTableId] = useState<string>("");

  const [guestCount, setGuestCount] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [modalData, setModalData] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSetter, setModalSetter] = useState<(v: string) => void>(() => {});

  const openModal = (options: any[], setter: (v: string) => void) => {
    setModalData(options);
    setModalSetter(() => setter);
    setModalVisible(true);
  };

  useEffect(() => {
    getCustomers().then((res) => setCustomers(res.data));
    getRestaurants().then((res) => setRestaurants(res.data));
  }, []);

  useEffect(() => {
    if (restaurantId) {
      getTablesByRestaurant(Number(restaurantId)).then((res) =>
        setTables(res.data)
      );
    }
  }, [restaurantId]);

  const onConfirm = () => {
    if (!customerId || !restaurantId || !tableId || !date || !time || !guestCount) return;

    createReservation({
      customerId: Number(customerId),
      restaurantId: Number(restaurantId),
      tableIds: [Number(tableId)],
      reservationDate: `${date}T${time}:00`,
      guestCount: Number(guestCount),
      specialRequests
    });
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <AppDropdown
          label="Customer"
          value={customerId ? customers.find(c => c.id === Number(customerId))?.fullName : ""}
          onPress={() =>
            openModal(
              customers.map((c) => ({ label: c.fullName, value: String(c.id) })),
              setCustomerId
            )
          }
        />

        <AppDropdown
          label="Restaurant"
          value={restaurantId ? restaurants.find(r => r.id === Number(restaurantId))?.name : ""}
          onPress={() =>
            openModal(
              restaurants.map((r) => ({ label: r.name, value: String(r.id) })),
              setRestaurantId
            )
          }
        />

        <AppDropdown
          label="Table"
          value={
            tableId
              ? `Table ${tables.find(t => t.id === Number(tableId))?.tableNumber}`
              : ""
          }
          onPress={() =>
            openModal(
              tables.map((t) => ({
                label: `Table ${t.tableNumber} (${t.seatCapacity})`,
                value: String(t.id)
              })),
              setTableId
            )
          }
        />

        <AppInput label="Guest Count" value={guestCount} onChangeText={setGuestCount} />

        <AppDatePicker label="Date" value={date} onPress={() => {}} />

        <AppTimePicker label="Time" value={time} onPress={() => {}} />

        <AppInput
          label="Special Requests"
          value={specialRequests}
          onChangeText={setSpecialRequests}
          multiline
        />

        <PrimaryButton title="Confirm Reservation" onPress={onConfirm} />
      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            {modalData.map((item) => (
              <TouchableOpacity
                key={item.value}
                onPress={() => {
                  modalSetter(item.value);
                  setModalVisible(false);
                }}
                style={styles.modalItem}
              >
                <Text style={styles.modalText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </>
  );
}
