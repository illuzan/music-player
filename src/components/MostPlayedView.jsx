import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import _, { isEmpty } from 'lodash';
import { Button, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import { TrackItem } from './TrackItem';
import {
  historySelectors,
  Player,
  useAppDispatch,
  useAppSelector,
} from '../store';

function useMostRepeated(data) {
  return _.chain(data).countBy().toPairs().sortBy(1).reverse().map(0).value();
}

export const MostPlayed = () => {
  const navigation = useNavigation();
  const history = useAppSelector(state => historySelectors.selectIds(state));
  var mostPlayedSongs = useMostRepeated(history);

  const dispatch = useAppDispatch();

  const play = track => {
    if (!isEmpty(track)) {
      dispatch(Player.playSong(track));
    }
  };

  const navigateToSongs = React.useMemo(
    () => () => {
      navigation.navigate('MostPlayed');
    },
    [navigation],
  );

  if (history.length > 3) {
    return (
      <View>
        <View style={styles.container}>
          <Title>Most Played</Title>
          {history.length > 3 && (
            <Button onPress={navigateToSongs} uppercase={false}>
              More
            </Button>
          )}
        </View>
        <FlatList
          horizontal
          data={mostPlayedSongs}
          keyExtractor={(item, index) => `most-played-${item}-${index}`}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <TrackItem id={item} onPress={play} />}
        />
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 16,
    marginBottom: 8,
  },
});
