import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Table = {
  id: number
  tableNumber: number
  seatCapacity: number
  restaurantId: number
}

type State = { list: Table[] }

const initialState: State = { list: [] }

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setTables: (state, action: PayloadAction<Table[]>) => {
      state.list = action.payload
    }
  }
})

export const { setTables } = tableSlice.actions
export default tableSlice.reducer
