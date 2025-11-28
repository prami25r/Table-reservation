import React, { useEffect, useState, useCallback } from "react";
import { FlatList, Alert } from "react-native";
import ReservationCard from "../components/cards/reservationcard";
import { updateStatus } from "../api/reservation";
import { formatDate, formatTime } from "../utils/date";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";


type SortConfig = { type: "date" | "guests"; order: "asc" | "desc" };

export default function Upcoming({
  data,
  sort,
  restaurantFilter,
}: {
  data: any[];
  sort?: SortConfig;
  restaurantFilter?: number | null;
}) {
  const [localData, setLocalData] = useState<any[]>([]);

  const loadData = useCallback(() => {
    let filtered = data.filter((x: any) => x.status === "Upcoming");

    if (restaurantFilter != null) {
      filtered = filtered.filter((x: any) => x.restaurantId === restaurantFilter);
    }

    if (sort) {
      if (sort.type === "date") {
        filtered = filtered.sort((a: any, b: any) => {
          const ad = new Date(a.reservationDate).getTime();
          const bd = new Date(b.reservationDate).getTime();
          return sort.order === "asc" ? ad - bd : bd - ad;
        });
      } else {
        filtered = filtered.sort((a: any, b: any) =>
          sort.order === "asc" ? a.guestCount - b.guestCount : b.guestCount - a.guestCount
        );
      }
    }

    setLocalData(filtered);
  }, [data, sort, restaurantFilter]);
  
  useFocusEffect(
  useCallback(() => {
    loadData();
  }, [])
);

  const handleCancel = async (id: number) => {
    try {
      await updateStatus(id, "Cancelled");
    } catch (err) {
      Alert.alert("Error", "Unable to cancel reservation");
    }
  };

  const handleCheckIn = async (id: number) => {
    try {
      await updateStatus(id, "Checked-In");
    } catch (err) {
      console.log("Check-in error:", err);
    }
  };

  return (
    <SafeAreaView>
      <FlatList
        data={localData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(i) => i.id.toString()}
        contentContainerStyle={{ paddingBottom: 120 }}
        renderItem={({ item }) => (
          <ReservationCard
            restaurantName={item.restaurant.name}
            restaurantLocation={item.restaurant.location || "Location"}
            guests={item.guestCount}
            date={formatDate(item.reservationDate)}
            time={formatTime(item.reservationDate)}
            status={item.status}
            onCancel={() => handleCancel(item.id)}
            onCheckIn={() => handleCheckIn(item.id)}
            onUpdate={() => {}}
          />
        )}
      />
    </SafeAreaView>
  );
}
