import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Player, songsSelectors, useAppDispatch, useAppSelector } from '../store/index';
import { List } from 'react-native-paper';
import { ArtCover } from './ArtCover';
import colors from '../utils/colors';


export const SongItem = React.memo(({ id }) => {

  const song = useAppSelector(state => songsSelectors.selectById(state, id));
  const dispatch = useAppDispatch();


  const play = () => {
    if (song) dispatch(Player.playSong(song));
  };

  if (!song) return null;
  return (
    <View style={[styles.surface, { backgroundColor: colors.Background }]}>
      <List.Item
        title={song?.title}
        description={song?.artist || song?.album}
        left={(props) => <ArtCover cover={song?.cover} {...props} />}
        onPress={() => play()}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  surface: {
    padding: 0,
    margin: 0,
    borderRadius: 4,
  },
});
