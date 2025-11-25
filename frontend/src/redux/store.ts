import { configureStore } from '@reduxjs/toolkit'
import customerReducer from './slices/customerslice'
import reservationReducer from './slices/reservationslice'
import restaurantReducer from './slices/restaurantslice'
import tableReducer from './slices/tableslice'

const store = configureStore({
  reducer: {
    customer: customerReducer,
    reservation: reservationReducer,
    restaurant: restaurantReducer,
    table: tableReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store