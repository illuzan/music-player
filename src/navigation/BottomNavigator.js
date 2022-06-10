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
import tw from 'twrnc'
import colors from '../utils/colors';
import { PlayerBar } from '../components/bottomBar/PlayerBar';
import { BottomTabBar } from '../components/bottomBar/BottomTabBar';

const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
  // const activeTintColor = colors.Accent;
  // const inactiveTintColor = color(colors.text)
  //   .alpha(0.5)
  //   .rgb()
  //   .string();
  return (
    <Tab.Navigator
      tabBar={props => (
        <BottomTabBar {...props} backgroundColor={colors.Surface} activeTintColor={colors.Accent} />
      )}
      screenOptions={{
        tabBarActiveTintColor: colors.Accent,
        tabBarInactiveTintColor: colors.OnAccent,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.Background,
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
            <House color='#fff' weight="regular" size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MagnifyingGlass color='#fff' weight="regular" size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Offline"
        component={OfflineMusicStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FloppyDiskBack color='#fff' weight="regular" size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <User color='#fff' weight="regular" size={size} />
          ),
        }}
      />
    </Tab.Navigator >
  );
}
