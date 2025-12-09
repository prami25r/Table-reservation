import store, { RootState, AppDispatch } from "../../../src/redux/store";
import { setReservations, upsertReservation, removeReservation } from "../../../src/redux/slices/reservationslice";

describe("Redux Store", () => {
  test("store initializes with correct default state", () => {
    const state = store.getState();

    expect(state).toHaveProperty("reservation");
    expect(state.reservation.list).toEqual([]);
  });

  test("dispatch and getState types work correctly", () => {
    const dispatch: AppDispatch = store.dispatch;
    const state: RootState = store.getState();

 
    expect(typeof dispatch).toBe("function");
    expect(state).toHaveProperty("reservation");
  });

  test("dispatching setReservations updates store", () => {
    const data = [
      {
        id: 1,
        restaurantId: 10,
        guestCount: 4,
        reservationDate: "2025-01-15",
        status: "Upcoming",
        restaurant: { name: "Food Hub" },
      },
    ];

    store.dispatch(setReservations(data));

    const state = store.getState().reservation.list;

    expect(state.length).toBe(1);
    expect(state[0].id).toBe(1);
  });

  test("upsertReservation adds or updates reservations", () => {
    const reservation = {
      id: 2,
      restaurantId: 20,
      guestCount: 2,
      reservationDate: "2025-02-10",
      status: "Upcoming",
      restaurant: { name: "A2B" },
    };


    store.dispatch(upsertReservation(reservation));
    let state = store.getState().reservation.list;
    expect(state.find((r) => r.id === 2)).toBeTruthy();

 
    const updated = { ...reservation, guestCount: 5 };
    store.dispatch(upsertReservation(updated));
    state = store.getState().reservation.list;

    expect(state.find((r) => r.id === 2)?.guestCount).toBe(5);
  });

  test("removeReservation removes correct item", () => {

    store.dispatch(removeReservation(2));

    const state = store.getState().reservation.list;

    expect(state.find((r) => r.id === 2)).toBeUndefined();
  });
});
