import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { getReservations } from "../../api/reservation";
import ReservationCard from "../../components/cards/reservationcard";
import styles from "./upcomingstyles";

export default function Upcoming() {
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    getReservations().then((res) => {
      const filtered = res.data.filter((r: any) => r.status === "Upcoming");
      const mapped = filtered.map((r: any) => ({
        restaurant: r.restaurant?.name || "",
        location: r.restaurant?.location || "",
        date: r.reservationDate.split("T")[0],
        time: r.reservationDate.split("T")[1].slice(0, 5),
        guests: r.guestCount,
        status: r.status
      }));
      setList(mapped);
    });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {list.map((item, idx) => (
        <ReservationCard key={idx} {...item} />
      ))}
    </ScrollView>
  );
}
