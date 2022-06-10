import React from 'react';
import { StyleSheet,TouchableOpacity } from 'react-native';
import { Surface } from 'react-native-paper';
import { Trash } from 'phosphor-react-native';
import { removeSongFromQueue, queueSelectors } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
// import { removeSongFromQueue, queueSelectors, toggleSongLike } from '@serenity/core';

export function TrackSurface({ id }) {
  const track = useSelector(state => queueSelectors.selectById(state, id));
  const dispatch = useDispatch();
  const removeFromQueue = (song) => {
    dispatch(removeSongFromQueue(song));
  };

  return (
    <Surface style={styles.rowBack}>
      <TouchableOpacity
        onPress={() => removeFromQueue(track)}>
        <Trash color='#dd1818' weight="regular" size="26" />
      </TouchableOpacity>
    </Surface>
  );
}

const styles = StyleSheet.create({
  rowBack: {
    alignItems: 'center',
    // backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
  },
});
