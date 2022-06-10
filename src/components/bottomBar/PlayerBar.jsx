import React, { useMemo } from 'react';
import { isEmpty } from 'lodash';
import { useNavigation } from '@react-navigation/core';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import {
  Surface,
  Text,
  Caption,
  IconButton,
  ActivityIndicator,
} from 'react-native-paper';
import { usePlaybackState } from 'react-track-player';
import { ArtCover } from '../ArtCover';
import { Pause, PauseCircle, Play, PlayCircle } from 'phosphor-react-native';
import colors from '../../utils/colors';
import { Player, useAppSelector } from '../../store';

export const PlayerBar = () => {
  const navigation = useNavigation();
  const { track } = useAppSelector((state) => state.player);

  const status = usePlaybackState();
  console.log(status)
  const togglePlayback = () => {
    if (status === "playing") {
      Player.pause();
    } else {
      Player.play();
    }
  };

  const navigateToPlayer = useMemo(
    () => () => navigation.navigate('PlayerScreen'),
    [navigation],
  );

  if (isEmpty(track)) {
    return null;
  }

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.trackContainer}
      onPress={navigateToPlayer}
    >
      <Surface style={styles.playBar}>
        <ArtCover cover={track.cover} />
        <View style={styles.textContainer}>
          <Text
            numberOfLines={1}
            style={styles.titleText}
          >
            {track.title}
          </Text>
          <Caption
            numberOfLines={1}
            style={styles.descriptionText}
          >
            {track.artist || track.album}
          </Caption>
        </View>
        <View style={styles.iconContainer}>
          {status === 'loading' ? (
            <ActivityIndicator animating={status === 'loading'} />
          ) : (
            <TouchableOpacity onPress={togglePlayback}>
              {status === 'playing' ? (
                <Pause color={colors.OnPrimary} weight="fill" size="36" />
              ) : (
                <Play color={colors.OnPrimary} weight="fill" size="36" />
              )}
            </TouchableOpacity>
          )}
        </View>
      </Surface>
    </TouchableOpacity >
  );
};

const styles = StyleSheet.create({
  trackContainer: { height: 60, width: '100%' },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 50,
  },
  icon: { margin: 0, padding: 0 },
  playBar: {
    alignItems: 'center',
    elevation: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  textContainer: {
    // alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 12,
  },
  titleText: {
    marginVertical: 0,
    includeFontPadding: false,
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
  },
  descriptionText: {
    marginVertical: 0,
    includeFontPadding: false
  }
});
