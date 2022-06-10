import React, { useEffect, useState } from 'react';
import { isEqual, isUndefined } from 'lodash';
import { View, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';


import FastImage from 'react-native-fast-image';
import DefaultImage from '../components/DefaultImage';

import colors from '../utils/colors';
import ActiveTrackIcon from './ActiveTrackIcon';
import { Player, useAppDispatch, useAppSelector } from '../store';



export const Track = ({ track, goBack }) => {
  const [isActive, setActive] = useState(false);
  const dispatch = useAppDispatch();
  const active = useAppSelector(
    (state) => state.player.active,
  );


  useEffect(() => {
    if (!isUndefined(active) && track.id) {
      setActive(isEqual(active.id, track.id));
    }
  }, [active, track]);

  const play = () => {
    if (!isActive) {
      dispatch(Player.playSong(track));
    }
    if (goBack) {
      goBack();
    }
  };

  return (
    <View style={[styles.surface, { backgroundColor: colors.Background }]}>
      <List.Item
        title={track?.title}
        description={track?.artist || track?.album}
        left={() =>
          track?.cover ? (
            <FastImage source={{ uri: track.cover }} style={styles.artwork} />
          ) : (
            <DefaultImage style={styles.artwork} />
          )
        }
        right={props =>
          active ? (
            <ActiveTrackIcon
              style={[{ height: 50, width: 30, marginLeft: 4 }, props.style]}
            />
          ) : null
        }
        onPress={() => play()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  surface: {
    padding: 0,
    margin: 0,
    borderRadius: 4,
  },
  artwork: {
    backgroundColor: '#d7d1c9',
    borderRadius: 4,
    height: 50,
    width: 50,
  },
});
