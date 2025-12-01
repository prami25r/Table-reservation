import React, { useEffect, useState, useCallback } from "react";
import { FlatList } from "react-native";
import ReservationCard from "../../components/cards/reservationcard";
import { formatDate, formatTime } from "../../utils/date";

type SortConfig = { type: "date" | "guests"; order: "asc" | "desc" };

export default function Cancelled({
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
    let filtered = data.filter((x) => x.status === "Cancelled");

    if (restaurantFilter != null) {
      filtered = filtered.filter((x) => x.restaurantId === restaurantFilter);
    }

    if (sort?.type === "date") {
      filtered = filtered.sort((a, b) => {
        const ad = new Date(a.reservationDate).getTime();
        const bd = new Date(b.reservationDate).getTime();
        return sort.order === "asc" ? ad - bd : bd - ad;
      });
    } else if (sort?.type === "guests") {
      filtered = filtered.sort((a, b) =>
        sort.order === "asc"
          ? a.guestCount - b.guestCount
          : b.guestCount - a.guestCount
      );
    }

    setLocalData(filtered);
  }, [data, sort, restaurantFilter]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <FlatList
      data={localData}
      showsVerticalScrollIndicator={false}
      keyExtractor={(i) => i.id.toString()}
      contentContainerStyle={{ paddingBottom: 120, paddingTop: 4 }}
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
  );
}
