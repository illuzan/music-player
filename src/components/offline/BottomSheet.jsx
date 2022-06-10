import * as React from 'react';
import { Surface } from 'react-native-paper';
import { Pressable } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import Animated, { Extrapolate, interpolateNode } from 'react-native-reanimated';
import colors from '../../utils/colors';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const CustomBackdrop = ({ animatedIndex, style, onPress }) => {
  // animated variables

  const animatedOpacity = React.useMemo(
    () =>
      interpolateNode(animatedIndex, {
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: Extrapolate.CLAMP,
      }),
    [animatedIndex],
  );

  // styles
  const containerStyle = React.useMemo(
    () => [
      style,
      {
        backgroundColor: colors.Background,
        opacity: animatedOpacity,
      },
    ],
    [style, animatedOpacity],
  );

  return <AnimatedPressable style={containerStyle} onPress={onPress} />;
};

export const BottomSheet = ({ bs, children }) => {
  const snapPoints = React.useMemo(() => ['30%', '60%'], []);

  const closeBottomSheet = () => {
    bs.current?.dismiss();
  };

  return (
    <BottomSheetModal
      ref={bs}
      index={1}
      snapPoints={snapPoints}
      backgroundComponent={() => <Surface style={{ flex: 1 }} />}
      // handleComponent={Handle}
      backdropComponent={props => (
        <CustomBackdrop {...props} onPress={closeBottomSheet} />
      )}>
      {children}
    </BottomSheetModal>
  );
};
