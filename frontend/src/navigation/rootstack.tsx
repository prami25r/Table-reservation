import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ReservationsScreen from '../screens/reservation'
import NewReservation from '../screens/newreservation'
import Upcoming from "../screens/upcoming";
import { RootStackParamList } from './type'

const Stack = createNativeStackNavigator<RootStackParamList>()

const RootStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Reservations" component={ReservationsScreen} />
    <Stack.Screen name="Upcoming" component={Upcoming} />
    <Stack.Screen name="NewReservation" component={NewReservation} />
  </Stack.Navigator>
)

export default RootStack
