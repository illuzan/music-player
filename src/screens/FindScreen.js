import React, { useLayoutEffect, useState } from 'react';
import { View, Keyboard, FlatList } from 'react-native';
import { Text, Searchbar, useTheme } from 'react-native-paper';
import { selectFilteredSongs, useAppSelector } from '../store';
// import { Screen } from '@serenity/components';
// import { selectFilteredSongs, useAppSelector } from '@serenity/core';
// import { SongItem } from './components/SongItem';
import Screen from '../components/Screen'
import { SongItemFind } from '../components/SongItemFind';

export function FindScreen({ navigation, route }) {
  const { colors } = useTheme();
  const [query, setQuery] = useState(route.params?.query);
  const songs = useAppSelector(state => selectFilteredSongs(state, query));

  const handleChange = (text) => {
    setQuery(text);
  };

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     header: () => (
  //       <View style={[{ backgroundColor: colors.surface }]}>
  //         <Searchbar
  //           style={{ borderRadius: 0 }}
  //           placeholder="Artists, songs or podcasts"
  //           onChangeText={handleChange}
  //           defaultValue={query}
  //           icon={navigation.goBack ? 'arrow-back-outline' : 'search-outline'}
  //           onIconPress={() => (navigation.goBack ? navigation.goBack() : Keyboard.dismiss())}
  //           clearIcon={query ? "close-outline" : "mic-outline"}
  //           autoFocus
  //         />
  //       </View>
  //     )
  //   })
  // }, [navigation]);

  return (
    <Screen>
      <Searchbar
        style={{ borderRadius: 0 }}
        placeholder="Artists, songs or podcasts"
        onChangeText={handleChange}
        defaultValue={query}
        icon={navigation.goBack ? 'arrow-back-outline' : 'search-outline'}
        onIconPress={() => (navigation.goBack ? navigation.goBack() : Keyboard.dismiss())}
        clearIcon={query ? "close-outline" : "mic-outline"}
        autoFocus
      />
      {songs && songs.length ? (
        <FlatList data={songs}
          keyExtractor={(item, index) => `search-${item}-${index}`}
          renderItem={({ item }) => (
            <SongItemFind track={item} />
          )}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text>No songs found</Text>
        </View>
      )}
    </Screen>
  );
}
