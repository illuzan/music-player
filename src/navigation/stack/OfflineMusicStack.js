import React from 'react'
import OfflineMusicScreen from '../../screens/OfflineMusicScreen';
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

export default function OfflineMusicStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='OfflineMusicScreen' component={OfflineMusicScreen} />
    </Stack.Navigator>
  )
}
