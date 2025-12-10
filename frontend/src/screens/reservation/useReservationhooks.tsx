import { useState, useEffect, useCallback } from "react";
import { getRestaurants, getReservations } from "../../api/reservation";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setReservations } from "../../redux/slices/reservationslice";

export function useReservationsLogic() {
  const dispatch = useAppDispatch();
  const reservations = useAppSelector((s) => s.reservation.list);

  const [active, setActive] = useState<"Upcoming" | "Checked-In" | "Cancelled">("Upcoming");

  const [sortConfig, setSortConfig] = useState({
    type: "date" as "date" | "guests",
    order: "desc" as "asc" | "desc",
  });

  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [restaurantFilter, setRestaurantFilter] = useState<number | null>(null);

  const loadRestaurants = useCallback(async () => {
    try {
      const res = await getRestaurants();
      setRestaurants(res.data || []);
    } catch {
      setRestaurants([]);
    }
  }, []);

  const loadReservations = useCallback(async () => {
    try {
      const res = await getReservations();
      dispatch(setReservations(res.data));
    } catch (err) {
      console.log("Reservation load error:", err);
    }
  }, [dispatch]);

  useEffect(() => {
    loadRestaurants();
    loadReservations();
  }, [loadRestaurants, loadReservations]);

  const handleSort = (type: "date" | "guests", order: "asc" | "desc") => {
    setSortConfig({ type, order });
  };

  const handleFilter = (id: number | null) => {
    setRestaurantFilter(id);
  };

  return {
    reservations,
    active,
    setActive,
    sortConfig,
    restaurants,
    restaurantFilter,
    handleSort,
    handleFilter,
  };
}
