import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { MusicNote } from 'phosphor-react-native';

export default DefaultImage = ({ style, size = 50 }) => {
  return (
    <LinearGradient
      colors={['#C9D6FF', '#E2E2E2']}
      style={[style, { justifyContent: 'center', alignItems: 'center' }]}
    >
      <MusicNote color='#ffffff' weight="bold" size={size < 200 ? size - 10 : 100} />
    </LinearGradient>
  );
};