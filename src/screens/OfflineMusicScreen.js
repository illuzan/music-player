import React, { useState, useRef, useEffect } from 'react';
import { Button, Divider, IconButton } from 'react-native-paper';
import { View, RefreshControl, StyleSheet, FlatList } from 'react-native';
import { useNavigation, useScrollToTop } from '@react-navigation/native';

import {
  Player,
  UI,
  Native,
  Playlist,
  songsSelectors,
  useAppSelector,
  useAppDispatch,
} from '../store/index';

import Screen from '../components/Screen';
import colors from '../utils/colors';
import { Blank } from '../components/Blank';
import { SongOptions } from '../components/offline/SongOptions';
import { SongItem } from '../components/offline/SongItem';

export default function OfflineMusicScreen() {
  const bottomSheetModalRef = React.useRef(null);

  const ref = useRef(null);
  useScrollToTop(ref);
  const [visible, setVisible] = useState('');
  const [song, setSong] = useState();
  // console.log(useAppDispatch)
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const { offlineReadAccessGiven } = useAppSelector(state => state.ui);
  const songs = useAppSelector(state => songsSelectors.selectAll(state));
  const { error, loading } = useAppSelector(state => state.songs);

  useEffect(() => {
    if (!songs.length) {
      fetchSongs();
    }
  }, []);

  async function fetchSongs() {
    try {
      if (offlineReadAccessGiven && !loading) {
        await dispatch(Native.getSongs());
      }
    } catch (err) {
      console.error('error', `Fetch failed: ${err.message}`);
    }
  }

  function showDialog() {
    setVisible('DIALOG');
  }

  const addToPlaylist = id => {
    dispatch(Playlist.addSongToPlaylist(id, song));
    setVisible('');
  };

  function play(song) {
    dispatch(Player.playSong(song));
  }

  const openBottomSheet = React.useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  function openMenu(songId) {
    setSong(songId);
    openBottomSheet();
  }

  if (!offlineReadAccessGiven || error) {
    return (
      <Blank
        text="View your media by Granting Storage Permission"
        fetchData={() => dispatch(UI.giveReadOfflineAccess())}
        buttonText="Allow Access"
      />
    );
  }

  if (songs.length) {
    return (
      <Screen>
        <View style={[styles.header, { backgroundColor: colors.Background }]}>
          <Button icon="play" onPress={() => dispatch(Player.add(songs))}>
            Play All
          </Button>
          <View style={{ flexDirection: 'row' }}>
            <IconButton
              icon="shuffle"
              color={colors.Accent}
              onPress={() => dispatch(Player.repeatSongs('shuffle'))}
            />
            <IconButton
              icon="magnify"
              color={colors.Accent}
              onPress={() =>
                navigation.navigate('FindScreen', {
                  type: 'offline',
                })
              }
            />
          </View>
        </View>
        <Divider />
        <SongOptions
          bs={bottomSheetModalRef}
          id={song}
          addSongToPlaylist={showDialog}
        />
        <FlatList
          ref={ref}
          data={songs}
          renderItem={({ item }) => (
            <SongItem id={item.id} onPress={play} openMenu={openMenu} />
          )}
          keyExtractor={item => `song-${item.id}`}
          refreshControl={
            <RefreshControl
              progressViewOffset={32}
              refreshing={loading}
              onRefresh={fetchSongs}
            />
          }
        />
      </Screen>
    );
  }

  return <Blank text="No offline songs found.." fetchData={fetchSongs} />;
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 2,
    marginHorizontal: 10,
  },
});
