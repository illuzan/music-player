import React from 'react';
import HomeScreen from '../../screens/HomeScreen';
import greetUser from '../../utils/greetUser';

import { createStackNavigator } from '@react-navigation/stack';


import {
  ClockCounterClockwise
} from 'phosphor-react-native';
import RecentPlayedScreen from '../../screens/RecentPlayedScreen';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


import tw from 'twrnc';
import colors from '../../utils/colors';

const Stack = createStackNavigator();

export default function HomeStack() {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.Surface,
        },
        headerTintColor: colors.OnSurface,
      }}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerTitle: greetUser(),
          cardStyle:{ backgroundColor: '#111111' },

          // headerTitleStyle: {fontFamily: 'Nunito-ExtraBold', fontSize: 24},
          headerRight: () => (
            <TouchableOpacity
              style={tw`pr-4`}
              onPress={() => navigation.navigate('RecentPlayed')}
            >
              <ClockCounterClockwise color={colors.OnSurface} weight="regular" size="24" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="RecentPlayed"
        component={RecentPlayedScreen}
        options={{
          title: 'Recently Played Songs',
        }}
      />
    </Stack.Navigator>
  );
}
