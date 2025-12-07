import React, { useEffect, useState, useCallback } from "react";
import { FlatList, Alert } from "react-native";
import ReservationCard from "../../components/cards/reservationcard";
import { updateStatus } from "../../api/reservation";
import { formatDate, formatTime } from "../../utils/date";
// import { useFocusEffect } from "../../../mocks/navigation.web";
import { useAppDispatch } from "../../redux/hooks";
import { updateStatus as updateStatusRedux } from "../../redux/slices/reservationslice";

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
  const dispatch = useAppDispatch();

  const loadData = useCallback(() => {
    let filtered = data.filter((x) => x.status === "Upcoming");

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

  // useFocusEffect(
  //   useCallback(() => {
  //     loadData();
  //   }, [loadData])
  // );

  const handleCancel = async (id: number) => {
    try {
      await updateStatus(id, "Cancelled");
      dispatch(updateStatusRedux({ id, status: "Cancelled" }));
    } catch {
      Alert.alert("Error", "Unable to cancel reservation");
    }
  };

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
          onCancel={() => handleCancel(item.id)}
        />
      )}
    />
  );
}
