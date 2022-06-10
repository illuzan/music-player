import React from 'react';
import {SearchScreen} from '../../screens/SearchScreen';
import { createStackNavigator } from '@react-navigation/stack';
import colors from '../../utils/colors';
import { ArrowLeft } from 'phosphor-react-native';
import { FilterScreen } from '../../screens/FilterScreen';

const Stack = createStackNavigator();

export default function SearchStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: 'screen',
        headerStyle: {
          backgroundColor: colors.Surface,
        },
        headerTintColor: colors.OnSurface,
        headerTitleAlign: 'center',
        safeAreaInsets: { top: 0, bottom: 0 },
        headerBackImage: () => (
          <ArrowLeft color={colors.OnSurface} weight="regular" size="36" />
        ),
      }}>
      <Stack.Screen
        options={{
          title: 'Search',
        }}
        name="SearchScreen"
        component={SearchScreen}
      />
            <Stack.Screen
        name="Filter"
        component={FilterScreen}
      />
    </Stack.Navigator>
  );
}
