import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Reservation = {
  id: number
  restaurant: string
  date: string
  time: string
  guests: number
  status: string
}

type State = { list: Reservation[] }

const initialState: State = { list: [] }

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    setReservations: (state, action: PayloadAction<Reservation[]>) => {
      state.list = action.payload
    }
  }
})

export const { setReservations } = reservationSlice.actions
export default reservationSlice.reducer