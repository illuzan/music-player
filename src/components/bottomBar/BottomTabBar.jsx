import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableRipple, Divider, Text } from 'react-native-paper';
import { PlayerBar } from './PlayerBar';


export const BottomTabBar = ({
  state,
  descriptors,
  navigation,
  backgroundColor,
  activeTintColor,
}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  const { routes } = state;
  return (
    <View style={[styles.tabBarContainer, { backgroundColor }]}>
      <PlayerBar />
      <Divider />
      <View style={styles.container}>
        {routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableRipple
              key={route.key}
              style={styles.tabButton}
              rippleColor={activeTintColor}
              underlayColor={activeTintColor}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
            >
              <View style={styles.labelContainer}>
                {options.tabBarIcon({ focused: isFocused })}
                <Text
                  style={[styles.labelText, {
                    fontFamily: isFocused ? 'Bold' : '',
                  }]}
                >
                  {label}
                </Text>
              </View>
            </TouchableRipple>
          );
        })}
      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  tabBarContainer: { elevation: 4 },
  container: {
    flexDirection: 'row',
    marginTop: 0,
  },
  labelContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  labelText: {
    includeFontPadding: false,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 12,
    letterSpacing: 0.4,
    marginTop: 3,
    marginBottom: 4,
    padding: 0,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    margin: 0,
    padding: 8,
    alignItems: 'center',
  },
});
