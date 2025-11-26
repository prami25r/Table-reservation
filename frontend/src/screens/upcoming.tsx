import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import ReservationCard from "../components/cards/reservationcard";
import { getReservations, updateStatus } from "../api/reservation";
import { formatDate, formatTime } from "../utils/date";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const Upcoming = () => {
  const navigation: any = useNavigation();
  const [data, setData] = useState([]);

  const loadData = async () => {
    try {

      const res = await getReservations();
      const filtered = res.data.filter((x: any) => x.status === "Upcoming");
      setData(filtered);
    } catch (err) {}
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdate = (reservation: any) => {
    navigation.navigate("NewReservation", { reservation });
  };

  const handleCancel = async (id: number) => {
    await updateStatus(id, "Cancelled");
    loadData();
  };

  const handleCheckIn = async (id: number) => {
    await updateStatus(id, "Checked-In");
    loadData();
  };

  return (
    <SafeAreaView>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }: any) => (
          <ReservationCard
            restaurantName={item.restaurant.name}
            restaurantLocation={item.restaurant.location || "Location"}
            guests={item.guestCount}
            date={formatDate(item.reservationDate)}
            time={formatTime(item.reservationDate)}
            status={item.status}
            onUpdate={() => handleUpdate(item)}
            onCancel={() => handleCancel(item.id)}
            onCheckIn={() => handleCheckIn(item.id)}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Upcoming;
