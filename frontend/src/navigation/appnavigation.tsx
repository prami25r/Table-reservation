import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import RootStack from './rootstack'
import Toast from "react-native-toast-message"

const AppNavigation = () => (
  <>
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
    <Toast />
  </>
)

export default AppNavigation
