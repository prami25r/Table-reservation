import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import ReservationCard from "../components/cards/reservationcard";
import { getReservations } from "../api/reservation";

const UpcomingList = ({ navigation }) => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const res = await getReservations();
    const filtered = res.data.filter((item) => item.status === "Upcoming");
    setData(filtered);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ReservationCard item={item} navigation={navigation} />
      )}
    />
  );
};

export default UpcomingList;
