import React from 'react'
import PlayerScreen from '../../screens/PlayerScreen';
import QueueScreen from '../../screens/QueueScreen';
import { createStackNavigator } from '@react-navigation/stack'
import colors from '../../utils/colors';

const Stack = createStackNavigator()

export default function PlayerStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.Background,
        },
        headerTintColor: colors.OnBackground,
        headerTopInsetEnabled: false,
      }}
    >
      <Stack.Screen name='Player' options={{ headerShown: false }} component={PlayerScreen} />
      <Stack.Screen name='QueueScreen' component={QueueScreen} />
    </Stack.Navigator>
  )
}
