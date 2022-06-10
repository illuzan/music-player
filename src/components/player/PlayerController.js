import * as React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { IconButton, FAB, useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { Player } from '../../store/index';
import { usePlaybackState } from 'react-track-player';
import colors from '../../utils/colors';
import {
  SkipBack,
  SkipForward,
  PlayCircle,
  PauseCircle,
} from 'phosphor-react-native';

export const PlayerController = () => {
  const dispatch = useDispatch();
  const state = usePlaybackState();
  const previous = () => {
    dispatch(Player.playPrevious());
  };

  const next = () => {
    dispatch(Player.playNext());
  };

  const togglePlayback = () => {
    if (state === "playing") {
      Player.pause()
    } else {
      Player.play();
    }
  };

  return (
    <View style={styles.playerToolbox}>
      {/* <TouchableOpacity
        // style={styles.icon}
        onPress={previous}>
        <SkipBack color={colors.OnPrimary} weight="regular" size="40" />
      </TouchableOpacity>
      <TouchableOpacity onPress={togglePlayback}>
        {state === 'playing' ? (
          <PauseCircle color={colors.OnPrimary} weight="fill" size="85" />
        ) : (
          <PlayCircle color={colors.OnPrimary} weight="fill" size="85" />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        // style={styles.icon}
        onPress={next}>
        <SkipForward color={colors.OnPrimary} weight="regular" size="40" />
      </TouchableOpacity> */}
      <IconButton icon="skip-previous" size={50} onPress={previous} />
      <FAB
        icon={state === 'playing' ? 'pause-circle' : 'play-circle'}
        onPress={togglePlayback}
        loading={state === 'loading'}
        style={{ backgroundColor: colors.OnSurface }}
        size={60}
      />
      <IconButton icon="skip-next" size={50} onPress={next} />
    </View>
  );
};

// const styles = StyleSheet.create({
//   playerToolbox: {
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//     alignItems: 'center',
//     flex: 3,
//   },
// });

const styles = StyleSheet.create({
  playerToolbox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 3,
  },
});
