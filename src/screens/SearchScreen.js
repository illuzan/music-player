import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Animated,
  Pressable,
  View,
} from 'react-native';
import { useTheme, Text, IconButton, Surface, Title } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { useScrollToTop } from '@react-navigation/native';
import { useCollapsibleHeader } from 'react-navigation-collapsible';
import Screen from '../components/Screen';

export const SearchScreen = ({ navigation }) => {
  const ref = useRef(null);
  const { colors, roundness } = useTheme();
  const [genres, setGenres] = useState([
    {
      title: 'Pop',
      colors__001: '#4ade80',
      colors__002: '#22c55e',
      url: 'https://www.youtube.com/playlist?list=PLMC9KNkIncKtPzgY-5rmhvj7fax8fdxoj',
    },
    {
      title: 'Party',
      colors__001: '#34d399',
      colors__002: '#10b981',
      url: 'https://www.youtube.com/playlist?list=PLMC9KNkIncKtPzgY-5rmhvj7fax8fdxoj',
    },
    {
      title: 'Chill',
      colors__001: '#38bdf8',
      colors__002: '#0ea5e9',
      url: 'https://www.youtube.com/playlist?list=PLMC9KNkIncKtPzgY-5rmhvj7fax8fdxoj',
    },
    {
      title: 'Workout',
      colors__001: '#10b981',
      colors__002: '#059669',
      url: 'https://www.youtube.com/playlist?list=PLMC9KNkIncKtPzgY-5rmhvj7fax8fdxoj',
    },
    {
      title: 'Classics',
      colors__001: '#60a5fa',
      colors__002: '#3b82f6',
      url: 'https://www.youtube.com/playlist?list=PLMC9KNkIncKtPzgY-5rmhvj7fax8fdxoj',
    },
  ]);
  useScrollToTop(ref);

  const { onScroll, containerPaddingTop, scrollIndicatorInsetTop, translateY } =
    useCollapsibleHeader({
      navigationOptions: {
        headerStyle: {
          backgroundColor: colors.background,
        },
      },
    });

  const stickyHeaderHeight = 60;

  // React.useEffect(() => {
  //   Genre.getGenres().then(data =>{
  //     console.log(data);
  //     setGenres(data);
  //   });
  // }, [])

  return (
    <Screen>
      <Animated.FlatList
        onScroll={onScroll}
        contentContainerStyle={{
          paddingTop: containerPaddingTop + stickyHeaderHeight,
        }}
        scrollIndicatorInsets={{
          top: scrollIndicatorInsetTop + stickyHeaderHeight,
        }}
        ref={ref}
        key="Genre"
        data={genres}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        ListHeaderComponent={() => (
          <Title style={styles.headline}>All Moods & Genres</Title>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              flex: 1,
            }}
            onPress={() =>
              navigation.navigate('Filter', {
                genre: item,
              })
            }>
            <LinearGradient
              colors={[item.colors__001, item.colors__002]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.item}>
              <Title style={{ color: 'white' }} numberOfLines={1}>
                {item.title}
              </Title>
            </LinearGradient>
          </TouchableOpacity>
        )}
      />

      <Animated.View
        style={{
          transform: [{ translateY }],
          position: 'absolute',
          backgroundColor: colors.background,
          top: containerPaddingTop,
          height: stickyHeaderHeight,
          width: '100%',
        }}>
        <Surface style={styles.searchBarContainer}>
          <Pressable onPress={() => navigation.navigate('FindScreen')}>
            <Surface style={[styles.searchInput, { borderRadius: roundness }]}>
              <IconButton icon="magnify" />
              <Text
                style={[
                  styles.searchBarPlaceholder,
                  { color: colors.placeholder },
                ]}>
                Artists, songs or podcasts
              </Text>
            </Surface>
          </Pressable>
        </Surface>
      </Animated.View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    marginHorizontal: 10,
    marginVertical: 6,
    elevation: 4,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  searchInput: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchBarPlaceholder: { fontSize: 18, paddingLeft: 8 },
  item: {
    borderRadius: 4,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    margin: 4,
    elevation: 8,
  },
  headline: {
    textAlign: 'center',
    marginVertical: 4,
  },
});
