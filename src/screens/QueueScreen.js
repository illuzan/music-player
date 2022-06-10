import React, { useState, useLayoutEffect } from 'react';
import { View } from 'react-native';
import { Button, Chip, Divider, Title } from 'react-native-paper';

import { SwipeListView } from 'react-native-swipe-list-view';

import Screen from '../components/Screen';
import { TrackItem } from '../components/player/TrackItem';
import { Track } from '../components/Track';
import { TrackSurface } from '../components/player/TrackSurface';
import { AlertDialog } from '../components/AlertDialog';
import { useDispatch } from 'react-redux';
import { clearQueue, queueSelectors, useAppSelector } from '../store';



export default function QueueScreen({ navigation }) {
  const dispatch = useDispatch();
  const active = useAppSelector((state) => state.player.track);
  const queue = useAppSelector(state => queueSelectors.selectIds(state));
  const [visible, setVisible] = useState(false);


  const close = () => {
    navigation.navigate('Home');
  };

  const openAlert = () => {
    setVisible(true);
  };

  const clearQueueSongs = () => {
    dispatch(clearQueue());
    close();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        // <Button icon="trash-can" mode="outlined" onPress={openAlert} disabled={false} compact={true} style={tw`p-0 m-0 rounded-xl`}>
        //   Clear Queue
        // </Button>
        <Chip icon="trash-can-outline" mode="outlined" onPress={openAlert} disabled={!queue.length} >
          Clear Queue
        </Chip>

      ),
    });
  }, [navigation]);




  return (
    <Screen>
      <AlertDialog
        visible={visible}
        hideDialog={() => setVisible(false)}
        action={clearQueueSongs}
        title="Clear Queue"
        message="Clear queue would stop current playing song"
      />
      <SwipeListView
        data={queue}
        ListHeaderComponent={() => (
          <View>
            <Title style={{
              margin: 8, fontSize: 16,
              fontWeight: "bold"
            }}>Now Playing</Title>
            {/* <Title style={{ margin: 8 }}>Now Playing</Title> */}
            <Track track={active} play={() => navigation.goBack()} active />
            <Title style={{
              margin: 8, fontSize: 16,
              fontWeight: "bold"
            }}>Next in Queue</Title>
            {/* <Title style={{ margin: 8 }}>Next in Queue</Title> */}
          </View>
        )}
        renderItem={({ item }) => <TrackItem id={item} />}
        ItemSeparatorComponent={() => <Divider inset />}
        keyExtractor={(item) => item}
        renderHiddenItem={({ item }) => <TrackSurface id={item} />}
        // leftOpenValue={75}
        rightOpenValue={-75}
        closeOnRowPress
        closeOnRowOpen
        useNativeDriver
        ListEmptyComponent={() => (
          <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, minHeight: 100 }}>
            <Title>No Songs in the queue</Title>
          </View>
        )}
      />
      <View style={{ height: 100 }} />
    </Screen>
  );
}
