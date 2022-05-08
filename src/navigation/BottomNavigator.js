import React from 'react';
import HomeStack from './stack/HomeStack';
import SearchStack from './stack/SearchStack';
import AccountStack from './stack/AccountStack';
import OfflineMusicStack from './stack/OfflineMusicStack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  FloppyDiskBack,
  House,
  MagnifyingGlass,
  User,
} from 'phosphor-react-native';

const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        // tabBarActiveTintColor: colors.activeTintColor,
        // tabBarInactiveTintColor: colors.inActiveTintColor,
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 0,
          paddingTop: 10,
          paddingBottom: 10,
          height: 60,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <House color={color} weight="regular" size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MagnifyingGlass color={color} weight="regular" size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Offline"
        component={OfflineMusicStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FloppyDiskBack color={color} weight="regular" size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <User color={color} weight="regular" size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
