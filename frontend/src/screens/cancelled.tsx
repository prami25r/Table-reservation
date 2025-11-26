import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import ReservationCard from "../components/cards/reservationcard";
import { getReservations } from "../api/reservation";
import { formatDate, formatTime } from "../utils/date";
import { SafeAreaView } from "react-native-safe-area-context";

const Cancelled = ({ navigation }: any) => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    try {
      const res = await getReservations();
      const filtered = res.data.filter((x: any) => x.status === "Cancelled");
      setData(filtered);
    } catch (err) {}
  };

  useEffect(() => {
    loadData();
    const unsubscribe = navigation?.addListener("focus", loadData);
    return unsubscribe;
  }, []);

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
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Cancelled;
