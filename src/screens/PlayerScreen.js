import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { X, Queue, Repeat, RepeatOnce } from 'phosphor-react-native';
import colors from '../utils/colors';
import { ActiveTrackDetails } from '../components/player/ActiveTrackDetails';
import { ProgressBar } from '../components/player/ProgressBar';
import { PlayerController } from '../components/player/PlayerController';
import tw from 'twrnc';
import Screen from '../components/Screen';
import { Player, useAppDispatch, useAppSelector } from '../store/index';
// import Images from '../assets/images';

export default function PlayerScreen({ navigation }) {
  const dispatch = useAppDispatch();

  const { track } = useAppSelector(
    (state) => state.player,
  );


  const repeat = 'repeat-off';
  const updateRepeatType = () => {
    if (repeat === 'repeat-all') {
      dispatch(Player.repeatSongs('repeat-one'));
    } else if (repeat === 'repeat-one') {
      dispatch(Player.repeatSongs('repeat-off'));
    } else {
      dispatch(Player.repeatSongs('repeat-all'));
    }
  };

  return (
    <Screen>
      <ImageBackground
        source={track.cover ? { uri: track.cover } : require('../assets/images/welcome.png')}
        blurRadius={40}
        style={[styles.imageBackground, { backgroundColor: colors.Background }]}>
        <View style={styles.playerContainer}>
          <View style={styles.container}>
            <TouchableOpacity
              style={tw`w-full pt-3 pl-4`}
              onPress={() => navigation.goBack()}>
              <X color={colors.OnPrimary} weight="bold" size="24" />
            </TouchableOpacity>
          </View>
          <ActiveTrackDetails track={track} />
          <ProgressBar />
          <View style={styles.playerToolbox}>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => navigation.navigate('QueueScreen')}>
              <Queue color={colors.OnPrimary} weight="regular" size="24" />
            </TouchableOpacity>
            <PlayerController />
            <TouchableOpacity onPress={updateRepeatType}>
              {repeat === 'repeat-off' ? (
                <Repeat color={colors.OnPrimary} weight="regular" size="24" />
              ) : (
                <RepeatOnce
                  color={colors.OnPrimary}
                  weight="regular"
                  size="24"
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 2,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover',
  },
  playerContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  playerToolbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 25,
    marginBottom: 100,
  },
  icon: { padding: 0, margin: 0 },
});
