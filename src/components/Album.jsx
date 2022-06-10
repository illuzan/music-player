import React from 'react';
import { List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import { AlbumCover } from './AlbumCover';
import { albumsSelectors, useAppSelector } from '../store';


export function Album({ id }) {
  const album = useAppSelector(state => albumsSelectors.selectById(state, id));
  const navigation = useNavigation();

  if (!album) return null;
  return (
    <List.Item
      title={album.album}
      left={props => <AlbumCover uri={album.cover} />}
      description={`${album.numberOfSongs} songs`}
      onPress={() => {
        navigation.navigate('OfflineSongs', {
          album,
        });
      }}
    />
  );
}
