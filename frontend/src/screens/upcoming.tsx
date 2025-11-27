import React, { useEffect, useState, useCallback } from "react";
import { FlatList, Alert } from "react-native";
import ReservationCard from "../components/cards/reservationcard";
import { getReservations, updateStatus } from "../api/reservation";
import { formatDate, formatTime } from "../utils/date";
import { SafeAreaView } from "react-native-safe-area-context";

type SortConfig = { type: "date" | "guests"; order: "asc" | "desc" };

export default function Upcoming({ sort }: { sort?: SortConfig }) {
  const [data, setData] = useState<any[]>([]);

  const loadData = useCallback(async () => {
    try {
      const res = await getReservations();
      let filtered = res.data.filter((x: any) => x.status === "Upcoming");

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
      } else {
        filtered = filtered.sort((a: any, b: any) => {
          const ad = new Date(a.reservationDate).getTime();
          const bd = new Date(b.reservationDate).getTime();
          return bd - ad;
        });
      }

      setData(filtered);
    } catch (err) {
      console.log("Error:", err);
    }
  }, [sort]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCancel = async (id: number) => {
    try {
      await updateStatus(id, "Cancelled");
      loadData();
    } catch (err) {
      console.log("Cancel error:", err);
      Alert.alert("Error", "Unable to cancel reservation");
    }
  };

  const handleCheckIn = async (id: number) => {
    try {
      await updateStatus(id, "Checked-In");
      loadData();
    } catch (err) {
      console.log("Check-in error:", err);
    }
  };

  return (
    <SafeAreaView>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
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
