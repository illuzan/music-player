import React from 'react';
import { List, IconButton } from 'react-native-paper';
import { songsSelectors, useAppSelector } from '../../store/index';
import { ArtCover } from '../ArtCover';

function Song({ id, onPress, openMenu }) {
  const song = useAppSelector(state => songsSelectors.selectById(state, id));
  if (!song) {
    return null;
  }
  return (
    <List.Item
      title={song.title}
      description={song.artist || song.album}
      left={props => <ArtCover cover={song.cover} />}
      right={props => (
        <IconButton
          {...props}
          icon="dots-vertical"
          onPress={() => openMenu(id)}
        />
      )}
      onPress={() => onPress(song)}
    />
  );
}

export const SongItem = React.memo(Song);
