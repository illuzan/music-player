import React from 'react'
import { useAuth } from '../utils/auth'
import AppNavigator from './AppNavigator'
import AuthNavigator from './AuthNavigator'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const NativeStack = createNativeStackNavigator();

export default function RootNavigator() {
  const { user } = useAuth()

  return (
    <NativeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      // initialRouteName={user ? 'App' : 'Auth'}
      initialRouteName='App'
    >
      <NativeStack.Screen name="App" component={AppNavigator} />
      <NativeStack.Screen name="Auth" component={AuthNavigator} />
    </NativeStack.Navigator>
  )
}
