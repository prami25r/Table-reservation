import reducer, {
  setReservations,
  upsertReservation,
  removeReservation,
  updateStatus,
} from "../../../src/redux/slices/reservationslice";

describe("Reservation Slice", () => {
  const baseReservation = {
    id: 1,
    restaurantId: 100,
    guestCount: 4,
    reservationDate: "2025-01-10",
    status: "Upcoming",
    restaurant: {
      name: "Food Hub",
      location: "Anna Nagar",
    },
  };

  const initialState = { list: [] };

  test("setReservations should replace entire list", () => {
    const newList = [baseReservation];

    const state = reducer(initialState, setReservations(newList));

    expect(state.list).toHaveLength(1);
    expect(state.list[0].id).toBe(1);
  });

  test("upsertReservation should add new reservation if not existing", () => {
    const state = reducer(initialState, upsertReservation(baseReservation));

    expect(state.list).toHaveLength(1);
    expect(state.list[0].id).toBe(1);
  });

  test("upsertReservation should update an existing reservation", () => {
    const updated = { ...baseReservation, guestCount: 6 };

    const preloaded = { list: [baseReservation] };

    const state = reducer(preloaded, upsertReservation(updated));

    expect(state.list[0].guestCount).toBe(6);
  });

  test("removeReservation should delete reservation by id", () => {
    const preloaded = { list: [baseReservation] };

    const state = reducer(preloaded, removeReservation(1));

    expect(state.list).toHaveLength(0);
  });

  test("updateStatus should update only the matching reservation", () => {
    const preloaded = { list: [baseReservation] };

    const state = reducer(
      preloaded,
      updateStatus({ id: 1, status: "Cancelled" })
    );

    expect(state.list[0].status).toBe("Cancelled");
  });

  test("updateStatus should do nothing if id does not exist", () => {
    const preloaded = { list: [baseReservation] };

    const state = reducer(
      preloaded,
      updateStatus({ id: 999, status: "Checked-In" })
    );

  
    expect(state.list[0].status).toBe("Upcoming");
  });
});
