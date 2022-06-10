import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import colors from "../utils/colors";

const Screen = ({ children }) => {
  return (
    <View
      style={[styles.container, { backgroundColor: colors.Background }]}
    >
      <StatusBar
        barStyle='light-content'
        backgroundColor={colors.Surface}
      />
      {children}
    </View>
  );
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
