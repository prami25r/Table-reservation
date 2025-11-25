import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Restaurant = {
  id: number
  name: string
  location: string
}

type State = { list: Restaurant[] }

const initialState: State = { list: [] }

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    setRestaurants: (state, action: PayloadAction<Restaurant[]>) => {
      state.list = action.payload
    }
  }
})

export const { setRestaurants } = restaurantSlice.actions
export default restaurantSlice.reducer