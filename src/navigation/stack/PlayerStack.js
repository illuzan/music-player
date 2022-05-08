import React from 'react'
import PlayerScreen from '../../screens/PlayerScreen';
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

export default function PlayerStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='PlayerScreen' component={PlayerScreen} />
    </Stack.Navigator>
  )
}
