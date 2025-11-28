import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Reservation = {
  id: number;
  restaurantId: number;
  guestCount: number;
  reservationDate: string;
  status: string;
  restaurant: {
    name: string;
    location?: string;
  };
};

type State = {
  list: Reservation[];
};

const initialState: State = {
  list: [],
};

const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    setReservations: (state, action: PayloadAction<Reservation[]>) => {
      state.list = action.payload;
    },

    upsertReservation: (state, action: PayloadAction<Reservation>) => {
      const index = state.list.findIndex((r) => r.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      } else {
        state.list.push(action.payload);
      }
    },

    removeReservation: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((r) => r.id !== action.payload);
    },

    updateStatus: (
      state,
      action: PayloadAction<{ id: number; status: string }>
    ) => {
      const item = state.list.find((r) => r.id === action.payload.id);
      if (item) {
        item.status = action.payload.status;
      }
    }
  },
});

export const {
  setReservations,
  upsertReservation,
  removeReservation,
  updateStatus,
} = reservationSlice.actions;

export default reservationSlice.reducer;
