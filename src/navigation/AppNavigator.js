import React from 'react';
import PlayerStack from './stack/PlayerStack';
import FindScreen from '../screens/FindScreen';
import BottomNavigator from './BottomNavigator';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Main" component={BottomNavigator} />
      <Stack.Screen name="PlayerScreen" component={PlayerStack} />
      <Stack.Screen name="FindScreen" component={FindScreen} />
    </Stack.Navigator>
  );
}
