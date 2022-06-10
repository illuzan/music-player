import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import Fuse from 'fuse.js';
// import { RootState } from '../../store';

const songsAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const songsSlice = createSlice({
  name: 'songs',
  initialState: songsAdapter.getInitialState({
    loading: false,
    error: null,
  }),
  reducers: {
    songAdded: songsAdapter.addOne,
    songsAdded: songsAdapter.addMany,
    // song
    toggleSongLike(state, action) {
      const song = state.entities[action.payload];
      if (song) {
        song.liked = !song.liked;
      }
    },
  },
});

// Can create a set of memoized selectors based on the location of this entity state
export const songsSelectors = songsAdapter.getSelectors(state => state.songs);

export const selectLikedSongIds = state =>
  songsSelectors
    .selectIds(state)
    .filter(id => songsSelectors.selectById(state, id)?.liked);

export const selectSongLikeById = (state, songId) => {
  return songsSelectors.selectById(state, songId)?.liked;
};

export const selectFilteredSongs = (state, query) => {
  if (!query) {
    return [];
  }
  const options = {
    includeScore: true,
    keys: ['author', 'title'],
  };
  const songs = songsSelectors.selectAll(state);
  const fuse = new Fuse(songs, options);
  const result = fuse.search(query);
  return result.map(item => item.item);
};

export const selectLikedSongs = state =>
  selectLikedSongIds(state).map(id => {
    const song = songsSelectors.selectById(state, id);
    return song;
  });

export const { toggleSongLike, songAdded, songsAdded } = songsSlice.actions;

export default songsSlice.reducer;
