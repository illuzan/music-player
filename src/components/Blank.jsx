import React from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import colors from '../utils/colors';


export const Blank = ({ text, fetchData, buttonText = 'Refresh' }) => {

  return (
    <View style={[styles.container, { backgroundColor: colors.Background }]}>
      <View style={styles.padding}>
        <Button mode="contained" onPress={fetchData}>
          {buttonText}
        </Button>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  padding: {
    margin: 4,
  },
});
