import moment from 'moment';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import { TrackPlayer, useProgress } from 'react-track-player';
import Slider from '@react-native-community/slider';

export const ProgressBar = () => {
  const { colors } = useTheme();
  const { duration, position } = useProgress();
  const [seekValue, setSeekValue] = useState();
  const [isSeeking, setSeeking] = useState(false);

  const getPosition = () => {
    let seconds;
    if (isSeeking) {
      seconds = seekValue;
    } else {
      seconds = position
    }
    return moment.utc(seconds).format("mm:ss")
  }

  return (
    <View style={{ marginHorizontal: 12 }}>
      <View style={styles.view}>
        <Slider
          style={{ width: '100%', height: 40 }}
          minimumValue={0}
          maximumValue={duration}
          value={position}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor={colors.placeholder}
          onSlidingStart={() => setSeeking(true)}
          onValueChange={value => setSeekValue(value)}
          onSlidingComplete={value => {
            TrackPlayer.pause();
            TrackPlayer.seekTo(value)
            TrackPlayer.play();
            setSeeking(false);
          }}
        />
      </View>
      <View style={styles.progressDetails}>
        <Text>{getPosition()}</Text>
        <Text>{moment.utc(duration).format("mm:ss")}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  progressDetails: { flexDirection: "row", justifyContent: 'space-between', marginHorizontal: 8, marginTop: 4 }
});
