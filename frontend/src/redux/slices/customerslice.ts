import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Customer = {
  id: number
  fullName: string
  mobileNumber: string
  email: string
}

type State = {
  list: Customer[]
}

const initialState: State = { list: [] }

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setCustomers: (state, action: PayloadAction<Customer[]>) => {
      state.list = action.payload
    }
  }
})

export const { setCustomers } = customerSlice.actions
export default customerSlice.reducer