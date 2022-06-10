import React, { useRef, useEffect } from 'react';
import LottieView from 'lottie-react-native';
import { View } from 'react-native';
import Animations from '../../assets/Animations';
import { usePlaybackState } from 'react-track-player';
import colors from '../utils/colors';


const ActiveTrackIcon = ({ style }) => {
  const animatedRef = useRef(null);
  const status = usePlaybackState();

  useEffect(() => {
    if (status === 'playing') {
      animatedRef.current?.play();
    } else {
      animatedRef.current?.pause();
    }
  }, [status]);

  return (
    <View style={[style, { justifyContent: 'center', alignItems: 'center' }]}>
      <LottieView
        ref={animatedRef}
        source={Animations.playerAnimation}
        colorFilters={[
          {
            keypath: 'Shape',
            color: colors.Accent,
          },
        ]}
      />
    </View>
  );
};

export default ActiveTrackIcon;
