import React, { useEffect, useState, useCallback } from "react";
import { FlatList } from "react-native";
import ReservationCard from "../components/cards/reservationcard";
import { getReservations } from "../api/reservation";
import { formatDate, formatTime } from "../utils/date";
import { SafeAreaView } from "react-native-safe-area-context";

type SortConfig = { type: "date" | "guests"; order: "asc" | "desc" };

export default function Cancelled({ sort }: { sort?: SortConfig }) {
  const [data, setData] = useState<any[]>([]);

  const loadData = useCallback(async () => {
    try {
      const res = await getReservations();
      let filtered = res.data.filter((x: any) => x.status === "Cancelled");

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

      setData(filtered);
    } catch (err) {
      console.log("Error:", err);
    }
  }, [sort]);

  useEffect(() => {
    loadData();
  }, [loadData]);

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
          />
        )}
      />
    </SafeAreaView>
  );
}
