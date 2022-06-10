import React from 'react'
import { useAuth } from '../utils/auth'
import AppNavigator from './AppNavigator'
import AuthNavigator from './AuthNavigator'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppDispatch, Player } from '../store/index'
const NativeStack = createNativeStackNavigator();

export default function RootNavigator() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(Player.setUpTrackPlayer());
    return () => Player.destroyTrackPlayer();
  }, []);


  const { user, loading } = useAuth()

  if (loading) {
    return null
  }

  return (
    <NativeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={user ? 'App' : 'Auth'}
    >
      <NativeStack.Screen name="App" component={AppNavigator} />
      <NativeStack.Screen name="Auth" component={AuthNavigator} />
    </NativeStack.Navigator>
  )
}
