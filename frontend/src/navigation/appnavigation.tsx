import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import RootStack from './rootstack'

const AppNavigation = () => (
  <NavigationContainer>
    <RootStack />
  </NavigationContainer>
)

export default AppNavigation

