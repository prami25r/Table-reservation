import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Upcoming from '../screens/upcoming'
import CheckedIn from '../screens/checkedIn'
import Cancelled from '../screens/cancelled'
import NewReservation from '../screens/newreservation'
import { RootStackParamList } from './type'

const Stack = createNativeStackNavigator<RootStackParamList>()

const RootStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Upcoming" component={Upcoming} />
    <Stack.Screen name="CheckedIn" component={CheckedIn} />
    <Stack.Screen name="Cancelled" component={Cancelled} />
    <Stack.Screen name="NewReservation" component={NewReservation} />
  </Stack.Navigator>
)

export default RootStack