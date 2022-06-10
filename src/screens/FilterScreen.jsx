import React, { useState, useEffect } from 'react';
import {isEmpty} from 'lodash';
import { ActivityIndicator, IconButton } from 'react-native-paper';
// import { Container, Screen } from '@serenity/components';
import { filterSongsByGenre } from '../store/actions/media';
import { SongList } from '../components/SongList';
import { EmptyPlaylist } from '../../components/EmptyPlaylist';


import Songs from '../utils/ytsongs'
import Screen from '../components/Screen';

export const FilterScreen = ({ navigation, route }) => {
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { genre, addToQueue } = route.params;
  console.log(genre)
  navigation.setOptions({
    headerTitle: genre.title,
    headerRight: () => (
      <IconButton
        icon="play-circle-outline"
        onPress={() => addToQueue()}
        disabled={!songs.length}
      />
    ),
  })

  useEffect(() => {
    setIsLoading(true);
    fetchData().then(() => {
      setIsLoading(false);
    })
  }, []);

  const fetchData = async () => {
    const data = await filterSongsByGenre(genre.title);
    const songs = await Songs.getSongs(genre);
    setSongs([...data, ...songs]);
  };


  if (isLoading) {
    return (
      <Screen>
          <ActivityIndicator />
        {/* <Container style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        </Container> */}
      </Screen>
    );
  }
//   if (isEmpty(songs)) {
//     return <EmptyPlaylist />;
//   }

  return (
    <Screen>
      <SongList
        data={songs}
        fetchData={fetchData}
        title={genre.title}
        cover={genre.image}
      />
    </Screen>
  );
};
