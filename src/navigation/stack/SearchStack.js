import React from 'react'
import SearchScreen from '../../screens/SearchScreen';
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

export default function SearchStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='SearchScreen' component={SearchScreen} />
    </Stack.Navigator>
  )
}
