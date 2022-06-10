import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Subheading, Text } from 'react-native-paper';
import ActiveTrackImage from './ActiveTrackImage';

export const ActiveTrackDetails = ({ track }) => {
  return (
    <View>
      <View style={styles.centerContainer}>
        {track?.cover ? (
          <FastImage
            source={{ uri: track.cover }}
            style={styles.artCover}
            resizeMode="cover"
          />
        ) : (
          <ActiveTrackImage style={styles.artCover} />
        )}
      </View>
      <View style={styles.centerContainer}>
        <Text
          style={{ fontSize: 24 }}
          numberOfLines={1}
        >
          {track.title}
        </Text>
        <Subheading numberOfLines={1}>
          {track.artist ? track.artist : track.album}
        </Subheading>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  artCover: {
    height: Dimensions.get('window').height - 450,
    width: Dimensions.get('window').width - 45,
    borderRadius: 8,
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 4,
  },
});
