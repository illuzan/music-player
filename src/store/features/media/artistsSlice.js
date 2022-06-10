import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
// import { RootState } from 'store';

const artistsAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.artist.localeCompare(b.artist),
});

const artistsSlice = createSlice({
  name: 'artists',
  initialState: artistsAdapter.getInitialState({
    loading: false,
    error: null,
  }),
  reducers: {
    artistAdded: artistsAdapter.addOne,
    artistsAdded: artistsAdapter.addMany,
    artistUpdated: artistsAdapter.updateOne,
  },
});

// Can create a set of memoized selectors based on the location of this entity state
export const artistsSelectors =
  artistsAdapter.getSelectors(state => state.artists);

export const selectArtistLikeById = (state, albumId) => {
  const album = artistsSelectors.selectById(state, albumId);
  return album?.liked;
};

export const selectLikedArtists = state =>
  artistsSelectors
    .selectIds(state)
    .filter(id => artistsSelectors.selectById(state, id)?.liked);

export const selectFilteredArtists = (state, query) =>
  artistsSelectors
    .selectIds(state)
    .filter(id =>
      artistsSelectors.selectById(state, id)?.artist.startsWith(query),
    );

export const { artistUpdated, artistAdded, artistsAdded } = artistsSlice.actions;

export default artistsSlice.reducer;
