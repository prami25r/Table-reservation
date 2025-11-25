import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import ReservationCard from "../components/cards/reservationcard";
import { getReservations } from "../api/reservation";

const CancelledList = () => {
  const [data, setData] = useState<any[]>([]);

  const loadData = async () => {
    const res = await getReservations();
    const filtered = res.data.filter((item: any) => item.status === "Cancelled");
    setData(filtered);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <FlatList
      data={data}
      keyExtractor={(item: any) => item.id.toString()}
      renderItem={({ item }: any) => (
        <ReservationCard item={item} />
      )}
    />
  );
};

export default CancelledList;

