import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { isEmpty, orderBy } from 'lodash';
import { Button, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import { TrackItem } from '../components/TrackItem';
import {
  historySelectors,
  Player,
  useAppDispatch,
  useAppSelector,
} from '../store';

export const RecentContainer = () => {
  const navigation = useNavigation();
  const songs = useAppSelector(state => historySelectors.selectEntities(state));
  const dispatch = useAppDispatch();

  const play = track => {
    if (!isEmpty(track)) {
      dispatch(Player.playSong(track));
    }
  };

  const navigateToSongs = () => {
    navigation.navigate('RecentPlayed');
  };

  let history = orderBy(songs, element => element.date, 'desc');

  if (history.length > 3) {
    return (
      <View>
        <View style={styles.container}>
          <Title>Recently Played</Title>
          {history.length > 3 ? (
            <Button onPress={navigateToSongs} uppercase={false}>
              More
            </Button>
          ) : null}
        </View>
        <FlatList
          horizontal
          data={history}
          keyExtractor={(item, index) => `recently-played-${item}-${index}`}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TrackItem id={item.id} onPress={play} />
          )}
        />
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
});
