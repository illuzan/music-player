import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import colors from '../utils/colors';
import DefaultImage from './DefaultImage';


export const ArtCover = memo(({ cover, style = {} }) => {
  if (cover) {
    return (
      <FastImage source={{ uri: cover }} style={[styles.artwork, style, { backgroundColor: colors.Surface }]} />
    );
  }

  return (
    <DefaultImage size={50} style={[styles.artwork, style]} />
  )
})


const styles = StyleSheet.create({
  artwork: {
    borderRadius: 4,
    height: 48,
    width: 48,
  },
});
