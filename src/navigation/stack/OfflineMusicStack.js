import React, { useState, useEffect } from 'react';
import OfflineMusicScreen from '../../screens/OfflineMusicScreen';
import OfflineAlbumScreen from '../../screens/OfflineAlbumScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();

export default function OfflineMusicStack() {
  return (
    <Tab.Navigator
      initialRouteName="OfflineSongs"
      screenOptions={{
        tabBarActiveTintColor: '#fff',
        tabBarLabelStyle: { fontSize: 16 },
        tabBarStyle: { backgroundColor: '#111111' },
      }}>
      <Tab.Screen
        name="OfflineSongs"
        component={OfflineMusicScreen}
        options={{ tabBarLabel: 'Songs' }}
      />
      <Tab.Screen
        name="OfflineAlbum"
        component={OfflineAlbumScreen}
        options={{ tabBarLabel: 'Album' }}
      />
    </Tab.Navigator>
  );
}
